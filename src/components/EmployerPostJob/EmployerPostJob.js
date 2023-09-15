import Header from "../Header.vue"
export default {
    components: {Header},
    data() {
        return {
            inputValue: '',
            inputTag:'',
            tags: [],
            selectedTags: [],
            selectedTagsID:[]
        };
    },

    mounted() {
        // init the page
        // this.$axios.get(this.$httpurl + '/public/taskTag/getTags').then(res => res.data).then(res => {
        //     console.log(res)
        //     if(res.code===200){
        //         this.tags = res.data;
        //     }else {
        //         alert("failed to get the data")
        //     }
        // })
    },
    watch: {
        selectedTags: {
            handler(newSelectedTags) {
                this.selectedTagsID = newSelectedTags.map(tag => tag.tagId);
            },
            deep: true,
        },
    },
    methods: {
        handleButtonClick() {
            console.log("按钮被点击了！");
            this.$router.push("/PostJobDetail")
            // this.$axios.post(this.$httpurl + '/public/tasks/postTask', {
            //     taskDescribe:  this.inputValue,
            //     taskImgURL: 'https://pic.616pic.com/ys_bnew_img/00/16/95/OjCm8gnt48.jpg',
            //     taskUserID: '用户ID',
            //     taskLabel: this.selectedTagsID // 你的任务标签列表
            // })
            //     .then(res => res.data)
            //     .then(res => {
            //         if (res.code === 200) {
            //             console.log(res.data);
            //             alert("add task successful");
            //
            //         } else {
            //             alert("failed to get the data");
            //         }
            //     });
        },
    }
};