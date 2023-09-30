import Header from "../Header.vue"
export default {
    components: {Header},
    data() {
        return {
            task1: {
                title: 'Professional Cleaning Services',
                category: 'Household Services',
                taskId: 1,
                content: 'We are seeking experienced and diligent professionals for cleaning services in our residence. The tasks include general house cleaning, vacuuming, dusting, mopping, and bathroom cleaning.',
                duration: 2,
                salary: 50,
                imageUrl: require("@/assets/img_3.png"),

            },
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
        handleButtonClick1() {
            console.log("按钮被点击了！");
            // this.$router.push({ path: "/PostJobDetail", query: { title: "Professional Cleaning Services"
            // , describe: "We are seeking experienced and diligent professionals for cleaning services in our residence. The tasks include general house cleaning, vacuuming, dusting, mopping, and bathroom cleaning."
            // , duration: 2, salary: 50} });
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task1}});
        },
    }
};