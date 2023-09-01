export default {
    data() {
        return {
            isLoading: false,
            registerForm: {
                email: '',
                password: '',
                firstname: '',
                lastname: ''
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.registrationForm.validate((valid) => {
                if (valid) {
                    // 在请求开始时显示加载图标
                    this.isLoading = true;
                    this.$axios.post(this.$httpurl + '/user/registration', this.registerForm)
                        .then(res => res.data)
                        .then(res => {
                            console.log(res);
                            if (res.code === 200) {
                                this.$message.success("The verity email has sent");
                                this.$router.push('/');
                            } else {
                                this.$message.error(res.data);
                            }
                        })
                        .finally(() => {
                            // 无论请求成功或失败，都在最后隐藏加载图标
                            this.isLoading = false;
                        });
                } else {
                    this.$message.error('请检查表单是否填写正确！');
                }
            });
        }
    }
};