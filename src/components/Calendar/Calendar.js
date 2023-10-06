import store from '../../store'; // 导入Vuex store
import Header from "../Header.vue"

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
            employerTask:[]


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