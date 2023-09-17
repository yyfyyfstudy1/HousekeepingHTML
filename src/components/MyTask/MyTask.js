import Header from "../Header.vue"
import store from '@/store';
export default {
    components: {Header},
    data() {
        return {
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
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        fetchUserTask(){
            this.user = store.getters.getUserInfo;
            let userId = this.user.id;
            this.$axios.get(this.$httpurl + '/user/myTask', {
                params: { taskUserId: userId }  // 根据需要动态传入用户ID
            })
                .then(response => {
                    console.log(response)
                    this.tableData=response.data
                })

        },
    }
}