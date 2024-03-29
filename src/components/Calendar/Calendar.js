import store from '../../store'; // 导入Vuex store
import Header from "../Header.vue"
import { MessageBox } from 'element-ui';
export default {
    name: "Calendar",
    components: {
        Header,
    },
    data() {
        return {
            task_begin_time: [
                // { timestamp: 1696658894000, taskInfo: "任务1详情" },
                // { timestamp: 1696399694000, taskInfo: "任务2详情" }
            ],
            employer_task_begin_time:[],

            today: new Date().setHours(0, 0, 0, 0),
            selectedDate: null,
            userId:null,
            taskerTask:[],
            employerTask:[],
            editDialogVisible: false, // 控制模态对话框的可见性
            editingTask: { // 跟踪被修改的任务信息
                taskBeginTime: null,
                taskLocation: '',
                taskDescribe: '',
                taskTitle: '',
                taskId: null
            }


        };
    },
    beforeMount() {
        this.user = store.getters.getUserInfo;
        this.userId = this.user.id;

        this.getEmployerUserTimetableData();
        this.getLaborUserTimetableData();
    },
    computed: {
        attributes() {
            const tasksAttributes = this.task_begin_time.map(item => ({
                key: item.taskBeginTime,
                dates: new Date(item.taskBeginTime),
                dot: 'red',
                popover: { label: this.truncateLabel(item.taskTitle) }
            }));

            const employerTasksAttributes = this.employer_task_begin_time.map(item => ({
                key: item.taskBeginTime,
                dates: new Date(item.taskBeginTime),
                highlight: {
                    color: 'green',
                    fillMode: 'solid',
                },
                popover: { label:  this.truncateLabel(item.taskTitle) }
            }));

            const todayAttribute = {
                key: this.today,
                dates: new Date(this.today),
                highlight: {
                    color: 'red', // 或任何其他颜色来标记当天的日期
                    fillMode: 'solid',
                },
                popover: { label: "This is today" }
            };

            return [todayAttribute, ...tasksAttributes, ...employerTasksAttributes];
        },

        formattedSelectedDate() {
            if (!this.selectedDate) return ''; // 检查selectedDate是否存在

            const date = new Date(this.selectedDate);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以+1，并确保它是两位数
            const day = date.getDate().toString().padStart(2, '0'); // 确保日期是两位数

            return `${year}-${month}-${day}`;
        }

    },
    methods: {
        navigateToTaskStatusHandler(type, taskId) {
            if (type === 1){
                this.$router.push(`/taskStatusHandler/employer?id=${taskId}`);
            }else {
                this.$router.push(`/taskStatusHandler/labor?id=${taskId}`);
            }

        },
        editTask(taskId) {
            // 使用filter方法从数组中找到特定taskId的任务
            const task = this.employerTask.find(t => t.taskId === taskId);

            if (task) {
                // 设置当前正在编辑的任务信息
                this.editingTask.taskBeginTime = task.taskBeginTime;
                this.editingTask.taskLocation = task.taskLocation;
                this.editingTask.taskDescribe = task.taskDescribe;
                this.editingTask.taskTitle = task.taskTitle;
                this.editingTask.taskId = task.taskId;

                // 打开模态对话框
                this.editDialogVisible = true;
            } else {
                console.error("Task not found for given taskId:", taskId);
            }
        },


        handleUpdateTask() {
            // 在这里，您可以调用API或其他方法来更新任务信息
            // 更新完成后关闭模态对话框
            this.editDialogVisible = false;


            // 转换taskBeginTime为时间戳
            if (typeof this.editingTask.taskBeginTime === 'string') {
                // 如果taskBeginTime是日期字符串，则首先将其解析为Date对象
                this.editingTask.taskBeginTime = new Date(this.editingTask.taskBeginTime).getTime();
            } else if (this.editingTask.taskBeginTime instanceof Date) {
                // 如果taskBeginTime是Date对象
                this.editingTask.taskBeginTime = this.editingTask.taskBeginTime.getTime();
            }

            // 发送请求更新task数据
            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/member/employer/editMyTask',this.editingTask, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success("Edit task information successful");
                        // 刷新页面
                        this.$router.go(0);

                    } else {
                        this.$message.error(res.data);
                    }
                });


        },
        handleEditDialogClose(done) {
            done();
        },


        deleteTask(taskId, userRole) {
            MessageBox.confirm('Are you sure you want to delete this task?', 'Confirmation', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                // 用户点击了“确定”按钮，进行删除操作
                const token = store.getters.getToken;
                this.$axios.get(this.$httpurl + '/member/employer/deleteMyTask', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        taskId: taskId,
                        userRole: userRole
                    }
                })
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 200) {
                            // 根据taskId过滤掉employerTask或其他相关数组中的这条task数据
                            if (userRole === 1) {
                                this.employerTask = this.employerTask.filter(task => task.taskId !== taskId);
                            } else if (userRole === 2) {
                                this.taskerTask = this.taskerTask.filter(task => task.taskId !== taskId);
                            }
                            console.log(res.data);
                            this.$message.success("Delete task successful");

                            // 刷新页面
                            this.getEmployerUserTimetableData();
                            this.getLaborUserTimetableData();
                        } else {
                            this.$message.error(res.data);
                        }
                    });
            }).catch(() => {
                // 用户点击了“取消”按钮或关闭了确认框，不做任何操作
            });
        },
        truncateLabel(label) {
            return label.length > 40 ? label.substr(0, 40) + '...' : label;
        },
        handleDayClick(day) {
            this.selectedDate = new Date(day.id).setHours(0, 0, 0, 0);  // 将日期设置为0点
             this.taskerTask = this.task_begin_time.filter(item => new Date(item.taskBeginTime).setHours(0, 0, 0, 0) === this.selectedDate);
            this.employerTask = this.employer_task_begin_time.filter(item => new Date(item.taskBeginTime).setHours(0, 0, 0, 0) === this.selectedDate);


            console.log(this.employerTask)
        },

        getEmployerUserTimetableData(){
            // send request to get the user timetable data
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/public/tasks/getTimeTableByUserID', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: this.userId,
                    userType: 1
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        console.log( res.data)
                        this.employer_task_begin_time = res.data
                    } else {
                        alert("failed to get the data");
                    }
                });
        },

        getLaborUserTimetableData(){
            // send request to get the user timetable data
            const token = store.getters.getToken;
            this.$axios.get(this.$httpurl + '/public/tasks/getTimeTableByUserID', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: this.userId ,
                    userType: 2
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        console.log( res.data)
                      this.task_begin_time = res.data

                    } else {
                        alert("failed to get the data");
                    }
                });
        }
    }


};