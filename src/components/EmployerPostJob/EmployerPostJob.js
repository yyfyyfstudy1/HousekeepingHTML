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
                imageUrl: require("@/assets/Cleaning_Services.jpg"),
            },
            task2: {
                title: 'Moving House',
                category: 'Transportation and Moving',
                taskId: 2,
                content: 'We are seeking reliable individuals with a good driving record to help with transportation and moving. Responsibilities include helping move personal items, ensuring safe transportation, and driving to specified locations.',
                duration: 3,
                salary: 60,
                imageUrl: require("@/assets/Transportation_Moving.jpeg"),
            },

            task3: {
                title: 'Chef needed',
                category: 'Food and Catering Services',
                taskId: 3,
                content: 'Looking for skilled chefs or caterers to provide quality food services for an upcoming event. Duties involve meal preparation, serving, and ensuring food hygiene standards.',
                duration: 4,
                salary: 70,
                imageUrl: require("@/assets/Food_Catering.jpg"),
            },

            task4: {
                title: 'Caring for the elderly',
                category: 'Personal Care and Companionship',
                taskId: 4,
                content: 'We need compassionate and patient individuals to provide personal care and companionship services. Tasks may include assisting with daily activities, companionship, and ensuring the well-being of clients.',
                duration: 3,
                salary: 55,
                imageUrl: require("@/assets/Personal_Care.jpg"),
            },

            task5: {
                title: 'Business Support',
                category: 'Business and Administrative Support',
                taskId: 5,
                content: 'In search of dedicated individuals with organizational skills to offer administrative support. Responsibilities encompass data entry, handling communications, and aiding with other business-related tasks.',
                duration: 5,
                salary: 65,
                imageUrl: require("@/assets/Business_Support.jpg"),
            },

            task6: {
                title: 'Hiring Sales',
                category: 'Sales and Marketing',
                taskId: 6,
                content: 'Seeking dynamic and persuasive individuals for sales and marketing roles. Duties involve promoting products or services, strategizing campaigns, and achieving sales targets.',
                duration: 4,
                salary: 70,
                imageUrl: require("@/assets/Sales_Marketing.jpg"),
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
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task1}});
        },
        handleButtonClick2() {
            console.log("按钮被点击了！");
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task2 }});
        },

        handleButtonClick3() {
            console.log("按钮被点击了！");
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task3 }});
        },

        handleButtonClick4() {
            console.log("按钮被点击了！");
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task4 }});
        },

        handleButtonClick5() {
            console.log("按钮被点击了！");
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task5 }});
        },

        handleButtonClick6() {
            console.log("按钮被点击了！");
            this.$router.push({ path: "/PostJobDetail", query: { task: this.task6 }});
        },

    }
};