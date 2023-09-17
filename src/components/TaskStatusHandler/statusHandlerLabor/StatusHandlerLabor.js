import Header from "../../Header.vue"
import store from '../../../store';
import MyMap from '../../GoogleMap/MyMap.vue'
let socket;
export default {
    components: {
        Header,
        MyMap
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
    data() {
        return {
            taskId:null,
            active: 0,  // 当前的状态
            taskDetail:{},
            mapsApiLoaded: false,
            startLat: "3301 Botany Rd, Zetland NSW 2017",
            startLng: "102 Regent St, Redfern NSW 2016",
            // endLat: -35.397,
            // endLng: 151.644
        };
    },
    methods: {
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
                        console.log(res)
                        this.active = res.data -2;
                    } else {
                        alert("failed to get the data");
                    }
                });
        },
        changeStatus(status) {
            this.active = status;
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
                    } else {
                        this.$message.error(res.data)
                    }
                });
        }
    },
};