import Header from "../Header.vue"

export default {
    components: {Header},
    data() {
        return {
            resumes: [ // 存储用户输入的多份简历
                {
                    inputText: '',
                }
            ],
            resumeForm: {
                jobType: null,
                expectedSalary: '',
                combineText:''   // combine the resume when the form submit
            },
            selectedTags: [],
            showReply: false,
            replyText: "",
            taskDescribe: "", // Add taskDescribe data
            taskImageUrl: "",   // Add taskImageU data
            tags: [],
            icon: 'el-icon-s-fold',
            selectedTagsID: [],
            WorkExperience:1,
            jobTypes: [], // 存储从服务器获取的工作类型数据
        };
    },
    directives: {
        numericInput: {
            bind(el, binding) {
                el.addEventListener("input", (event) => {
                    // 移除非数字字符
                    const inputValue = event.target.value.replace(/[^0-9]/g, "");
                    // 添加单位并更新输入框的值
                    event.target.value = inputValue + " $ / PER HOUR";
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

        handleSelectionChange(newValue){
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
        addResume() {
            if (this.WorkExperience < 3){
                this.resumes.push({
                    inputText: '',
                    jobType: '',
                    expectedSalary: ''
                });
                this.WorkExperience +=1;
            }else {
                this.$message.error("You have add the max work experience")
            }


        },
        handleSubmit() {
            // 遍历 resumes 数组，将所有的 inputText 拼接成一个字符串
            const combinedText = this.resumes.map(resume => resume.inputText).join(',');
            // 将合并后的文本赋值给 resumeForm.combineText
            this.resumeForm.combineText = combinedText;

            // 使用 this.$router.push 进行路由导航，传递参数通过 query
            this.$router.push({
                name: "showMatchWork", // 下一页的路由路径
                params: {
                    resumeForm: this.resumeForm,
                    selectedTagsID: this.selectedTagsID
                }
            });

            this.showReply = true;
        }
    }
};