import Header from "../../Header.vue"
import store from '../../../store';
let socket;
export default {
    components: {
        Header,
    },
    mounted() {
        const id = this.$route.query.id;
        this.taskId = id;
        console.log("接收到的 id 参数为：", id);

        this.user = store.getters.getUserInfo;
        this.userId = this.user.id;
        // 打开websocket接收后端推送的任务phase
        this.initWebSocket();

    },
    data() {
        return {
            taskId:null,
            userId:null,
            isConfirmed: false,
            active: 0,  // 当前的状态
        };
    },
    methods: {
        changeStatus(status) {
            this.isConfirmed = true;
            this.active = status;

            // 告知后端更新stage并且推送给labor消息
            const requestBody = {
                userRole: "employer",
                userId: this.userId,
                taskId: this.taskId
            }
            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/member/employer/employerConfirmTask', requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success("you have confirm the task")
                    } else {
                        alert("failed to get the data");
                    }
                });

        },

        initWebsocket(){
            this.user = store.getters.getUserInfo;
            let userId = this.user.id;
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                console.log(userId)
                let socketUrl = "ws://localhost:8082/notification/" + userId;
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                // 开启一个websocket服务
                socket = new WebSocket(socketUrl);
                //打开事件
                socket.onopen = function () {
                    console.log("websocket已打开");
                };
                //  浏览器端收消息，获得从服务端发送过来的文本消息
                // 使用箭头函数，让 this能访问到外部函数的作用域
                socket.onmessage = (msg) => {
                    console.log("收到数据====" + msg.data)
                    const JsonMessage = JSON.parse(msg.data)
                    if (JsonMessage.status === "ok" && JsonMessage.taskId === this.taskId) {



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
        },
    },
};