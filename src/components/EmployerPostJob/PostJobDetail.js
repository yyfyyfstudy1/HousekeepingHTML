import Header from "../Header.vue"
import store from '../../store';
let socket;
export default {
    components: {
        Header,
    },
    name: "PostJobDetail",
    data() {
        return {
            task: {
                userID: null,
                title: '',
                imageUrl:'',
                describe: '',
                duration: '',
                location: '',
                salary: '',
                category: null,
                taskDate: '',
                taskTime: '',
                taskTimeStamp: '',
                jobCategory: '',
                tags:[]
            },
            selectedTags: [],
            jobTypes: [],
            tags: [],
            isLoading: false,
            taskId:null
        }
    },

    directives: {
        numericInput: {
            bind(el, binding) {
                el.addEventListener("input", (event) => {
                    // 移除非数字字符
                    const inputValue = event.target.value.replace(/[^0-9]/g, "");
                    // 添加单位并更新输入框的值
                    event.target.value = inputValue + "  / HOUR";
                    // 触发input事件以便v-model可以正常工作
                    event.target.dispatchEvent(new Event("input"));
                });
            },
        },
    },
    mounted() {
        // init the page
        this.$axios.get(this.$httpurl + '/public/taskCategory/allCategory').then(res => res.data).then(res => {
            console.log(res)
            if (res.code === 200) {
                this.jobTypes = res.data;
            } else {
                alert("failed to get the data")
            }
        })
    },
    methods: {
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
                        this.isLoading = false;
                        this.$router.push({
                            path: '/taskStatusHandler/employer',
                            query: { id: this.taskId }
                        });

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
        chooseFile() {
            // 手动触发文件选择输入框
            console.log('选择文件按钮被点击');
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            if (!selectedFile) {
                return;
            }

            this.uploadFile(selectedFile);
        },
        uploadFile(file) {

            const formData = new FormData();
            formData.append('file', file);

            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/member/employer/uploadImage', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.task.imageUrl = res.data;
                    } else {
                        alert("failed to get the data");
                    }
                });

        },

        handleSelectionChange(newValue) {

            this.task.category = newValue;
            this.selectedTags = []
            console.log('选中的工作类型值：', newValue);
            this.$axios.get(this.$httpurl + '/public/taskTag/getTags', {
                params: {
                    category: newValue
                }
            })
                .then(res => res.data)
                .then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.tags = res.data;
                    } else {
                        alert("failed to get the data")
                    }
                })
        },
        submitForm() {
            const userID = store.getters.getUserInfo.id;
            this.task.userID = userID;

            const date = new Date(this.task.taskDate);
            const time = new Date(this.task.taskTime);

            // 获取日期部分
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            // 获取时间部分
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();

            // 合并日期和时间
            const combinedDate = new Date(year, month, day, hours, minutes, seconds);
            console.log(combinedDate)
            // 获取合并后的时间戳
            const combinedTimestamp = combinedDate.getTime();
            // 验证时间戳是否有效
            if (!isNaN(combinedTimestamp)) {
                this.task.taskTimeStamp = combinedTimestamp;

                // 表单验证通过，可以在这里提交任务数据
                console.log(this.task);
                // 在这里提交任务数据到后端或进行其他操作
            } else {
                this.$message.error('日期和时间格式无效，请重新选择！');
            }

            this.task.tags = this.selectedTags;


            console.log(this.task)

           // 组装表单结束，发送表单
            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/member/employer/postTask', this.task, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success("post task success")
                        this.isLoading = true;
                        this.taskId = res.data
                        console.log(res.data)
                        this.initWebsocket();
                    } else {
                        alert("failed to get the data");
                    }
                });


        },
    },
}