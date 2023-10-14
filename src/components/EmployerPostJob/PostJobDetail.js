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
                imageUrl: '',
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
            taskId: null,
            newTag: '',
            dialogVisible: false
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
        // 如果是模板按钮跳转至此页面，填充
        const queryParams = this.$route.query;
        if (queryParams && queryParams.task) {
            this.task.title = queryParams.task.title || '';
            this.task.describe = queryParams.task.content || '';
            this.task.duration = Number(queryParams.task.duration) || 0;
            this.task.salary = Number(queryParams.task.salary) || 0;
            this.task.jobCategory = queryParams.task.taskId || null;

            // 获取当前日期和时间
            const currentDate = new Date();
            // 格式化为 YYYY-MM-DD 格式
            this.task.taskDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            // 格式化为 HH:MM 格式
            this.task.taskTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

            this.task.imageUrl = queryParams.task.imageUrl || null;

            // Only call this method if tagId is present in queryParams.task
            if (queryParams.task.taskId) {
                this.handleSelectionChange(this.task.jobCategory);
            }
        }
    },
    methods: {

        // 用户新增tag
        addTag() {
            if (this.newTag && !this.tags.some(tag => tag.tagName === this.newTag)) {


              const requestBody ={
                  tagName:this.newTag,
                  tagCreater: "general user",
                  category :  this.task.category

                }
                // 发送请求，添加tag
                this.$axios.post(this.$httpurl + '/public/taskTag/addTag', requestBody)
                    .then(res => res.data)
                    .then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.tags.push({ tagName: this.newTag, tagId: res.data });

                        this.newTag = '';
                        this.dialogVisible = false;
                    } else {
                        alert("failed to add the tag")
                    }
                })

            } else {
                alert('Tag already exists or input is empty!');
            }
        },
        updateAddress(place) {
            this.task.location = place.formatted_address;
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
                    if (JsonMessage.status === "ok" && String(JsonMessage.taskId) == this.taskId) {
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
        dumpToTimeTable(){
            this.$router.push("/calendar")
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