import store from '../../store'; // 导入Vuex store
import Header from "../Header.vue"
let socket;
export default {
    name: "ChatRoom",
    components: {
        Header,
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
            remoteUserInfo: {}
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
        content() {
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
            this.content = '';

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

                        for (const message of this.historyMessage){

                            if(message.fromUserEmail === this.user.email){
                                this.createContent(null, this.user.email, message.postMessageContent)
                            } else {
                                this.createContent(message.fromUserEmail, null, message.postMessageContent)
                            }
                        }


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
                    this.messages.push({user: this.user.email, text: this.text})

                    // {"from": "zhang", "text": "hello"}
                    // {"user":"yu", "text": "xxxxxxx" }
                    console.log("这是什么东东：" + this.messages)
                    // 构建消息内容，本人消息
                    this.createContent(null, this.user.email, this.text)
                    this.text = '';
                }
            }
        },
        createContent(remoteUser, nowUser, text) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
            let html
            // 当前用户消息
            if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
                html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
                    "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
                    "    <div class=\"tip left\">" + text + "</div>\n" +
                    "  </div>\n" +
                    "  <div class=\"el-col el-col-2\">\n" +
                    "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
                    "    <img src=\"" + this.thisUserInfo.avatarUrl + "\" style=\"object-fit: cover;\">" +
                    "  </span>\n" +
                    "  </div>\n" +
                    "</div>";
            } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
                html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
                    "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
                    "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
                    "    <img src=\"" + this.remoteUserInfo.avatarUrl + "\" style=\"object-fit: cover;\">" +
                    "  </span>\n" +
                    "  </div>\n" +
                    "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
                    "    <div class=\"tip right\">" + text + "</div>\n" +
                    "  </div>\n" +
                    "</div>";
            }
            this.content += html;
        },
        init() {
            this.user = store.getters.getUserInfo;
            let userEmail = this.user.email;
            let _this = this;
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                let socketUrl = this.$websocketurl  +"/imserver/" + userEmail;
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                // 开启一个websocket服务
                socket = new WebSocket(socketUrl);
                // 打开事件
                socket.onopen = function () {
                    console.log("websocket已打开");
                };
                //  浏览器端收消息，获得从服务端发送过来的文本消息
                socket.onmessage = function (msg) {
                    console.log("收到数据====" + msg.data)
                    let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"userEmail": "zhang"},{ "userEmail": "admin"}]}
                    if (data.users && Array.isArray(data.users)) {  // 获取在线人员信息
                        const onlineEmails = data.users.map(onlineUser => onlineUser.userEmail);

                        _this.users = _this.users.map(user => ({
                            ...user,
                            isOnline: onlineEmails.includes(user.email)
                        }));

                    } else {
                        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
                        //  // {"from": "zhang", "text": "hello"}
                        if (data.from === _this.chatUser) {
                            _this.messages.push(data)
                            // 构建消息内容
                            _this.createContent(data.from, null, data.text)
                        }
                    }
                };
                //关闭事件
                socket.onclose = function () {
                    console.log("websocket已关闭");
                };
                //发生了错误事件
                socket.onerror = function () {
                    console.log("websocket发生了错误");
                }
            }
        }
    }
}