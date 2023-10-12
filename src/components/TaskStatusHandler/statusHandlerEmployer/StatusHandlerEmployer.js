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

        // 查询当前的任务状态
        this.getCurrentTaskPhase();

        this.user = store.getters.getUserInfo;
        this.userId = this.user.id;
        // 打开websocket接收后端推送的任务phase
        this.initWebsocket();

        // 从数据库查询到任务的
    },
    data() {
        return {
            taskId:null,
            userId:null,
            isConfirmed: false,
            active: 0,  // 当前的状态

            dialogVisible: false,
            tasker: {},

            time: 0,
            timer: null,

            taskPhase: 0,
        };
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


    methods: {
            getPaypal() {
                // 在此处发送请求到后端控制器
                // 使用axios或其他HTTP库发送请求到Spring Boot后端
                const requestBody={
                    taskId: this.taskId
                }
                const token = store.getters.getToken;
                this.$axios.post(this.$httpurl+'/paypal/pay',requestBody, {
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }})
                    .then(response => {
                        window.open(response.data, '_self')
                     console.log(response);   // 处理后端的响应
                    })
                    .catch(error => {
                        // 处理错误
                    });
            },

            stopTiming(){
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
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
                query: { role: "employer" }
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
                        // 检查到状态为未确定订单  任务状态为2
                        if (this.active === 0) {
                            this.dialogVisible = true;
                            // 发送请求获取tasker信息
                            this.getTaskerInfo()

                        }
                        // 如果任务在第四阶段，active为2的时候查询任务进入第四阶段的时间
                        if (this.active === 2){
                            this.getOldTime();
                        }
                    } else {
                        alert("failed to get the data");
                    }
                });
        },
        getTaskerInfo(){
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/public/tasks/getTaskerInfo', {
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
                        this.tasker = res.data;

                    } else {
                        alert("failed to get the data");
                    }
                });
        },
        changeStatus(status) {
            this.dialogVisible = false;  // Close the dialog
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

                    if (JsonMessage.status === "ok" && JsonMessage.taskId == this.taskId) {
                        console.log("wdffffffffff")
                        // update the status bar phase is 3
                        this.active = parseFloat(JsonMessage.phase) - 2;
                    }

                    // handle error
                    if (JsonMessage.status === "no" && JsonMessage.taskId == this.taskId) {
                        console.log("wdffffffffff")

                        if (JsonMessage.phase == 14){
                            // error且 阶段等于14， 停止timer
                            this.stopTiming();
                            this.taskPhase = 14;
                        }

                        if (JsonMessage.phase == 4){
                            // error且 阶段等于4， 重启timer
                            this.taskPhase = 4;
                            this.startTimer();
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
        },

        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    },
};