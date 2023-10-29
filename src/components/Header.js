import store from "@/store";
let socket;
export default {
    data() {
        return {
            userName: 'YYF', // 替换为实际用户姓名
            avatarUrl: require('@/assets/img_2.png'),
            messageCount: 10, // 示例数据
            isShaking: false
        };
    },
    computed: {
        id() {
            // Get the user from the store and return its id
            const user = store.getters.getUserInfo;
            return user.id;
        }
    },
    mounted() {
        // Automatically fetch the profile once the component is mounted
        this.fetchUserProfile();
        this.initWebsocket();
        this.getNotificationCount();
    },
    methods: {
        onReceiveMessage() {
            this.isShaking = true;
            setTimeout(() => {
                this.isShaking = false;
            }, 3000);
        },
        gotoMessages() {
            // 使用 Vue Router 的编程式导航功能跳转到消息页面
            this.$router.push('/notification');
        },
        getNotificationCount(){
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/member/notification/getUnreadNotification', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: this.id,
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.messageCount = res.data.length;

                    } else {
                        alert("failed to get the data");
                    }
                });
        },


        navigateTo(route) {
            this.$router.push(route);
        },
        handleCommand(command) {
            this.$router.push(command);
            if (command === 'logout') {
                // 这里执行登出的逻辑
                // 1. Update the store state
                store.commit('setIsLoggedIn', false);
                store.commit('setToken', null);
                // 2. Redirect to the login page
                this.$router.push('/'); // Assuming the route path for your login page is '/login'

            }
        },
        fetchUserProfile() {
            this.$axios.get(this.$httpurl + '/user/profile', {
                params: {id: this.id}  // 根据需要动态传入用户ID
            })
                .then(response => {
                    if (response.data.code === 200) {
                        const userData = response.data.data;
                        this.userName = userData.name;
                        this.avatarUrl = userData.avatarUrl;
                    } else {
                        console.error("Error fetching profile:", response.data.msg);
                    }
                })
                .catch(error => {
                    console.error("Error fetching profile:", error.response ? error.response.data : error.message);
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
                let socketUrl = this.$websocketurl + "/notification/" + userId;
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

                socket.onmessage = (msg) => {
                    console.log("收到数据====" + msg.data)
                    const JsonMessage = JSON.parse(msg.data)

                    console.log("Parsed data:", JsonMessage);
                    console.log("Current taskId:", this.taskId);
                    console.log("Typeof received taskId:", typeof JsonMessage.taskId);
                    console.log("Typeof this.taskId:", typeof this.taskId);

                    // 收到消息就调用查询已读消息的方法
                    console.log("header的消息提示出现了")
                    this.onReceiveMessage();
                    this.getNotificationCount()
                    let sound = document.getElementById('notificationSound');
                    sound.play();
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