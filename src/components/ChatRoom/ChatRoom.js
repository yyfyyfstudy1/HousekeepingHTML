import store from '../../store'; // 导入Vuex store
import Header from "../Header.vue"
import ChatBubble from './ChatBubble.vue';
let socket;
export default {
    name: "ChatRoom",
    components: {
        Header,
        ChatBubble
    },
    data() {
        return {
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            role:"",
            user: {},
            isCollapse: false,
            users: [],
            onlineUsers: [], // 在线的用户列表
            chatUser: '',
            text: "",
            messages: [],
            content: '',
            historyMessage:{},

            thisUserInfo:{},
            remoteUserInfo: {},
            translateText: '',
        }
    },
    async mounted() {

        const role = this.$route.query.role;
        this.role = role;
        this.getMatchUser()
        this.init()

        const userEmail = store.getters.getUserInfo.email;
        this.thisUserInfo = await this.getThisUserInfoByEmail(userEmail)
    },
    watch: {
        messages() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        }
    },
    methods: {
        async getThisUserInfoByEmail(userEmail) {
            const token = store.getters.getToken;
            let userInfoUse = "";

            try {
                const response = await this.$axios.get(this.$httpurl + '/user/userInfo', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        email: userEmail,
                    }
                });

                if (response.data.code === 200) {
                    console.log(response.data);
                    userInfoUse = response.data.data;
                } else {
                    alert("failed to get the data");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }

            return userInfoUse;
        },

        getMatchUser(){
            const requestBody ={
                role: this.role,
                userId: store.getters.getUserInfo.id
            }

            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/member/chatRoom/getMatchUserInfo', requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success("Get info successful")
                        this.users = res.data
                    } else {
                        alert("failed to get the data");
                    }
                });

        },
        scrollToBottom() {
            const scrollDiv = this.$refs.scrollDiv;
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        },
        async  switchAccount(userEmail){
            this.chatUser =userEmail;
            // clear the chat content
            // 清空之前的消息
            this.messages = [];

            // get remote user information
            this.remoteUserInfo = await this.getThisUserInfoByEmail(userEmail);

            console.log(this.thisUserInfo)
            console.log(this.remoteUserInfo)
            // get the history of chat
            const requestForm = {
                "email1": this.user.email,
                "email2" : userEmail
            }

            const headers = {
                'Authorization': 'Bearer ' + store.getters.getToken,
                'Custom-Header': 'Custom-Value'
            };
            const config = {
                headers: headers,
            };
            this.$axios.post(this.$httpurl + '/member/chatRoom/getMessageHistory', requestForm, config)
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success("get chat history successful");
                        this.historyMessage = res.data;

                        for (const message of this.historyMessage) {
                            const isNowUser = message.fromUserEmail === this.user.email;

                            // 添加消息到messages数组
                            this.messages.push({
                                id: message.id,
                                text: message.postMessageContent,
                                avatarUrl: isNowUser ? this.thisUserInfo.avatarUrl : this.remoteUserInfo.avatarUrl,
                                isNowUser: isNowUser
                            });
                        }

                        console.log(this.messages)

                    } else {
                        this.$message.error(res.data);
                    }
                });
        },
        send() {
            if (!this.chatUser) {
                this.$message({type: 'warning', message: "请选择聊天对象"})
                return;
            }
            if (!this.text) {
                this.$message({type: 'warning', message: "请输入内容"})
            } else {
                if (typeof (WebSocket) == "undefined") {
                    console.log("您的浏览器不支持WebSocket");
                } else {
                    console.log("您的浏览器支持WebSocket");
                    // 组装待发送的消息 json
                    // {"from": "zhang", "to": "admin", "text": "聊天文本"}
                    let message = {from: this.user.email, to: this.chatUser, text: this.text}
                    socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发

                    // 将消息添加到messages数组
                    this.messages.push({
                        id: Date.now(),  // 作为一个临时的唯一标识符
                        text: this.text,
                        avatarUrl: this.thisUserInfo.avatarUrl,
                        isNowUser: true
                    });

                    this.text = '';
                }
            }
        },

        init() {
            this.user = store.getters.getUserInfo;
            let userEmail = this.user.email;
            if (typeof (WebSocket) === "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                let socketUrl = this.$websocketurl + "/imserver/" + userEmail;
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                // 开启一个websocket服务
                socket = new WebSocket(socketUrl);
                // 打开事件
                socket.onopen = () => {
                    console.log("websocket已打开");
                };
                // 浏览器端收消息
                socket.onmessage = (msg) => {
                    console.log("收到数据====" + msg.data);
                    let data = JSON.parse(msg.data);

                    if (data.users && Array.isArray(data.users)) {  // 获取在线人员信息
                        const onlineEmails = data.users.map(onlineUser => onlineUser.userEmail);

                        this.users = this.users.map(user => ({
                            ...user,
                            isOnline: onlineEmails.includes(user.email)
                        }));
                    } else {
                        // 如果服务器端发送过来的json数据不包含 users 这个key，那么发送过来的就是聊天文本json数据
                        if (data.from === this.chatUser) {
                            this.messages.push({
                                user: data.from,
                                text: data.text,
                                avatarUrl: this.remoteUserInfo.avatarUrl, // 假设你在此处可以获得远程用户的头像信息
                                isNowUser: false
                            });
                        }
                    }
                };
                // 关闭事件
                socket.onclose = () => {
                    console.log("websocket已关闭");
                };
                // 发生了错误事件
                socket.onerror = () => {
                    console.log("websocket发生了错误");
                };
            }
        }

    }
}