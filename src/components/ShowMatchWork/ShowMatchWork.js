import Header from "@/components/Header";
import store from '../../store';
import {mapActions} from "vuex"; // 导入Vuex store
import { MessageBox } from 'element-ui';
export default {
    name: "ShowMatchWork",
    components: {Header},

    data() {
        return {
            data: [], // 用于存储从服务器获取的数据数组
            loading: false, // 控制加载框和遮罩层的显示
            dialogVisible: false, // 控制模态对话框的显示
            bigImageUrl: '', // 用于存储大图的 URL
            userId:null
        };
    },
    props: {
        resumeForm: {},
        selectedTagsID: Array
    },

    created() {
        this.userId = store.getters.getUserInfo.id;
        const oldTaskData = store.getters.getTaskData;
        console.log(oldTaskData)
        if (oldTaskData.length !== 0) {
            // set the old task data
            this.data = oldTaskData
        } else {
            this.fetchData();
        }

    },

    methods: {
        ...mapActions(['setTaskData']),

        handleCardClick(taskId) {
            console.log("Card clicked with taskId: ", taskId);

            MessageBox.confirm('Begin with this task ?', 'Task confirm', {
                confirmButtonText: 'CONFIRM',
                cancelButtonText: 'CANCEL',
                type: 'warning'
            }).then(() => {

                // 告知后端更新stage并且推送给employer消息
                const requestBody = {
                    userRole: "labor",
                    userId: this.userId,
                    taskId: taskId
                }
                const token = store.getters.getToken;
                this.$axios.post(this.$httpurl + '/public/tasks/takeTask', requestBody, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message.success("you have confirm the task")

                            // drump to status bar
                            this.$router.push({
                                path: '/taskStatusHandler/labor',
                                query: { id: taskId }
                            });
                        } else {
                            alert("failed to get the data");
                        }
                    });

            }).catch(() => {
                console.log("用户取消操作");
            });
        },

        showBigImage(url) {
            this.bigImageUrl = url; // 设置大图的 URL
            this.dialogVisible = true; // 显示模态对话框
        },
        fetchData() {
            // 显示加载框和遮罩层
            this.loading = true;
            // 使用 Axios从服务器获取数据
            // Simulate submitting and receiving taskDescribe and taskImageU
            this.$axios.post(this.$httpurl + '/public/tasks/getDistribute', {
                cv: this.resumeForm.combineText,
                tags: this.selectedTagsID,
                userId: this.userId
            })
                .then(res => res.data)
                .then(res => {
                    // 隐藏加载框和遮罩层
                    this.loading = false;

                    if (res.code === 200) {
                        this.data = res.data;
                        // save the task data to the VueX
                        this.setTaskData({taskData: this.data})
                    } else {
                        alert("failed to get the data");
                    }
                });
        },
        truncate(text, length) {
            if (text.length > length) {
                return text.substring(0, length) + '...';
            }
            return text;
        },
        handleButtonClick() {
            // 处理按钮点击事件
            // 可以在这里执行一些逻辑
            const ids = this.data.map(task => task.task.taskId);
            console.log("wdf!!!!!!!!!!!!!"+ids)
            // 再次分配
            // 显示加载框和遮罩层
            this.loading = true;
            // 使用 Axios从服务器获取数据
            // Simulate submitting and receiving taskDescribe and taskImageU
            this.$axios.post(this.$httpurl + '/public/tasks/getDistribute', {
                cv: this.resumeForm.combineText,
                tags: this.selectedTagsID,
                userId: this.userId,
                taskIDList: ids
            })
                .then(res => res.data)
                .then(res => {
                    // 隐藏加载框和遮罩层
                    this.loading = false;

                    if (res.code === 200) {
                        this.data = res.data;
                        // save the task data to the VueX
                        this.setTaskData({taskData: this.data})
                    } else {
                        alert("failed to get the data");
                    }
                });

        },
        formatTimestampToDate(timestamp) {
            const date = new Date(timestamp); // 假设timestamp是毫秒级的时间戳
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');  // 月份从0开始，所以+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }
}