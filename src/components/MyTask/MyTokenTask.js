import Header from "../Header.vue"
import store from '@/store';
export default {
    components: {Header},
    data() {
        return {
            statusColorMap: {
                'matching labor': 'primary',
                'labor take order': 'success',
                'employer confirm': 'warning',
                'labor is arrived': 'info',
                'labor is finished work': 'danger',
                'employer confirm finished': 'success' // 以及其他状态和颜色的映射
            },
            tableData: []
        }
    },
    beforeMount() {
        // Automatically fetch the profile once the component is mounted
        this.fetchUserTask();
    },
    methods: {
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        formatter(row) {
            return row.taskLocation;
        },
        salaryFilterHandler(value, row, column) {
            const salary = row.taskSalary;
            switch (value) {
                case '0~100$':
                    return salary >= 0 && salary <= 100;
                case '100~500$':
                    return salary > 100 && salary <= 500;
                case '500~1000$':
                    return salary > 500 && salary <= 1000;
                case 'over 1000$':
                    return salary > 1000;
                default:
                    return false;
            }
        },
        statusFilterHandler(value, row) {
            const status = row.taskPhaseDescribe;
            return status === value;
        },
        getStatusTagType(status) {
            const statusColorMap = {
                'matching labor': 'warning',
                'labor take order': 'danger',
                'employer confirm': 'primary',
                'labor is arrived': 'info',
                'labor is finished work': 'success',
                'employer confirm finished': 'success',
            };

            // 检查状态是否在颜色映射中，如果不在，则使用默认颜色
            return statusColorMap[status] || 'default';
        },
        fetchUserTask(){
            this.user = store.getters.getUserInfo;
            let userId = this.user.id;
            this.$axios.get(this.$httpurl + '/user/myTokenTask', {
                params: { userId: userId }  // 根据需要动态传入用户ID
            })
                .then(response => {
                    console.log(response)
                    this.tableData=response.data
                })

        },
    }
}