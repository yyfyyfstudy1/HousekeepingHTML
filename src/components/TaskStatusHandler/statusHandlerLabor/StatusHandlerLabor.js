import Header from "../../Header.vue"
import store from '../../../store';
import MyMap from '../../GoogleMap/MyMap.vue'
import FireworksEffect from '../FireworksEffect.vue';

let socket;
export default {
    components: {
        Header,
        MyMap,
        FireworksEffect
    },

    mounted() {
        const id = this.$route.query.id;
        this.taskId = id;
        console.log("接收到的 id 参数为：", id);
        // 查询当前的任务状态
        this.getCurrentTaskPhase();

        // get task detail
        this.getTaskDetail();

        // 开始接收后端传递的消息
        this.initWebsocket();


        // 异步加载Google Maps API，然后设置mapsApiLoaded为true
        let script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDM_dL6KmNoXYqXsAR8HFsYAftHpIVk4Mg';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            this.mapsApiLoaded = true;
        };
        document.head.appendChild(script);

    },
    watch: {
        active(newVal) {
            if (newVal === 2) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        }
    },
    computed: {
        formattedTime() {
            let seconds = this.time;
            const hours = Math.floor(seconds / 3600);
            seconds %= 3600;
            const minutes = Math.floor(seconds / 60);
            seconds %= 60;

            return [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');
        }
    },
    data() {
        return {
            taskId:null,
            active: 0,  // 当前的状态
            taskDetail:{},
            mapsApiLoaded: false,
            laborAddress: "3301 Botany Rd, Zetland NSW 2017",
            taskAddress: "102 Regent St, Redfern NSW 2016",

            time: 0,
            timer: null,

            confirmDialogVisible: false,
            currentAction: 0, // 1 for task completion, 2 for stopping timer
            taskPhase: 0,

            laborWorkDuration: 0,
            isLoading: true  // 初始化 isLoading 变量
            // endLat: -35.397,
            // endLng: 151.644
        };
    },
    methods: {

        stopTiming(){
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        closeWebsocket() {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.close();
                console.log("WebSocket closed due to user leaving the page.");
            }
        },

        showConfirmDialog(action) {
            this.currentAction = action;
            this.confirmDialogVisible = true;
        },
        handleConfirm() {
            // 用户点击确认按钮后的处理逻辑
            if (this.currentAction === 1) {
                // 处理任务完成操作
                // labor confirm task finished
                this.active = 3;

                const requestBody = {
                    userRole: "labor",
                    userId: this.userId,
                    taskId: this.taskId
                }
                const token = store.getters.getToken;
                this.$axios.post(this.$httpurl + '/public/tasks/laborFinishedTask', requestBody, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message.success("you have confirm finished task")
                            this.taskPhase = 5;
                        } else {
                            alert("failed to get the data");
                        }
                    });


            } else if (this.currentAction === 2) {
                // 处理停止计时器操作
                this.stopTiming();
                // 发送请求后端更新任务phase到14
                const requestBody = {
                    userRole: "labor",
                    userId: this.userId,
                    taskId: this.taskId
                }
                const token = store.getters.getToken;
                this.$axios.post(this.$httpurl + '/public/tasks/laborStopTask', requestBody, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message.success("you have confirm stop task")
                        } else {
                            alert("failed to get the data");
                        }
                    });

            }else if (this.currentAction === 3) {

                // 发送请求，更新状态回到4
                const requestBody = {
                    userRole: "labor",
                    userId: this.userId,
                    taskId: this.taskId
                }
                const token = store.getters.getToken;
                this.$axios.post(this.$httpurl + '/public/tasks/laborRestartTask', requestBody, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message.success("you have confirm restart task")
                            this.taskPhase = 4;
                            this.startTimer();
                        } else {
                            alert("failed to get the data");
                        }
                    });

            }
            this.confirmDialogVisible = false;
        },
        handleCancel() {
            // 用户点击取消按钮后的处理逻辑
            this.confirmDialogVisible = false;
        },

        getOldTime(){
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/member/employer/getTaskPhaseFourBeginTime', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    taskId: this.taskId,
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {

                        const taskPhaseUpdateTime = res.data.taskPhaseUpdateTime;
                        const taskAlreadyWorkTime =res.data.laborWorkTime;
                        const currentTime = Date.now();

                        if (this.taskPhase == 14){
                            // 如果当前处于任务暂停状态
                            this.time = Math.floor(taskAlreadyWorkTime / 1000);  // 将毫秒转换为秒，然后计算差值
                        }else {
                            // 如果任务不在暂停暂停
                            // 当前时间 - 更新时间 + 已经工作的时间
                            // taskPhaseUpdateTime是重启任务的时间
                            this.time = Math.floor((currentTime - taskPhaseUpdateTime + taskAlreadyWorkTime) / 1000);  // 将毫秒转换为秒，然后计算差值
                        }

                    } else {
                        alert("failed to get the data");
                    }
                });
        },
        startTimer() {
            if (this.taskPhase !== 14){
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = setInterval(() => {
                    this.time++;
                }, 1000);
            }

        },
        dumpToChatRoom(){
            this.$router.push({
                path: '/chatRoom',
                query: { role: "labor" }
            });
        },
        getCurrentTaskPhase(){
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/member/employer/getCurrentTaskPhase', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    taskId: this.taskId,
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.taskPhase = res.data;
                        console.log(res)
                        if (res.data == 14){
                            this.active = 2
                        }else {
                            this.active = res.data -2;
                        }

                        // 如果任务在第四阶段，active为2的时候查询任务进入第四阶段的时间
                        if (this.active === 2){
                            // 初始化timer
                            this.getOldTime();
                        }

                    } else {
                        alert("failed to get the data");
                    }
                });
        },
        confirmArrived(status) {
            this.active = status;
            // send request to notification employer change status
            const requestBody = {
                userRole: "labor",
                userId: this.userId,
                taskId: this.taskId
            }
            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/public/tasks/laborConfirmArrived', requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success("you have confirm arrived task place")
                    } else {
                        alert("failed to get the data");
                    }
                });

        },
        initWebsocket(){
            this.user = store.getters.getUserInfo;
            let userId = this.user.id;
            this.fetchUserProfile();
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
                //  浏览器端收消息，获得从服务端发送过来的文本消息
                // 使用箭头函数，让 this能访问到外部函数的作用域
                socket.onmessage = (msg) => {
                    console.log("收到数据====" + msg.data)
                    const JsonMessage = JSON.parse(msg.data)

                    console.log("Parsed data:", JsonMessage);
                    console.log("Current taskId:", this.taskId);
                    console.log("Typeof received taskId:", typeof JsonMessage.taskId);
                    console.log("Typeof this.taskId:", typeof this.taskId);

                    // 通知服务端消息已经接收到了
                    let message = {notificationId: JsonMessage.notificationId, isRead: 1}

                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(message));
                    } else {
                        console.log("WebSocket is not open:", socket.readyState);
                    }

                    if (JsonMessage.status === "ok" && JsonMessage.taskId == this.taskId) {
                        console.log("wdffffffffff")
                        // update the status bar phase is 3
                        this.active = parseFloat(JsonMessage.phase) - 2;


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

        formatDate(timestamp) {
            let date = new Date(timestamp);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        getTaskDetail(){
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/member/employer/getTaskDetailById', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    taskId: this.taskId,
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        console.log(res.data)
                        this.taskDetail = res.data
                        this.taskAddress = res.data.taskLocation
                    } else {
                        this.$message.error(res.data)
                    }
                });
        },

        fetchUserProfile() {
            this.$axios.get(this.$httpurl + '/user/profile', {
                params: { id: this.user.id }  // 根据需要动态传入用户ID
            })
                .then(response => {
                    if (response.data.code === 200) {
                        const userData = response.data.data;
                        this.laborAddress = userData.address;
                    } else {
                        console.error("Error fetching profile:", response.data.msg);
                    }
                })
                .catch(error => {
                    console.error("Error fetching profile:", error.response ? error.response.data : error.message);
                });
        },

        beforeDestroy() {
            this.closeWebsocket();
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    },
};