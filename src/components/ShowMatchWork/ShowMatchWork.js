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
        };
    },
    props: {
        resumeForm: {},
        selectedTagsID: Array
    },

    created() {
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

                this.$router.push({
                    path: '/taskStatusHandler/labor',
                    query: { paramName: 'paramValue' }
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
                tags: this.selectedTagsID
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
        }
    }
}