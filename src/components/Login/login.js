import { mapActions } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';
export default {
    components: {
        VueRecaptcha
    },
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            loginRole:[],
            userInfo:{},
            sitekey: "6LcC8YIoAAAAAEFixedQ23yMdOI1BOn94aYPzezY"
        };
    },
    methods: {
        ...mapActions(['login']),
        loginPress() {
            let loginForm = this.loginForm;
            this.$axios.post(this.$httpurl + '/user/login', loginForm)
                .then(res => res.data)
                .then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.loginRole = res.data.roles
                        this.userInfo =res.data.userInfo

                        console.log( "user info"+res.data.userInfo)
                        this.login({ token: res.data.authorization.token, role:this.loginRole, userInfo: this.userInfo }); // 使用映射的 action 方法
                        this.$router.push('/selectHome');
                    } else {
                        this.$message.error(res.data);
                    }
                });
        },
        registerPress(){
            this.$router.push("/register")
        },
        submit: function(token) {
            console.log(token);
        },
        loaded() {
            setTimeout(() => {
                window.grecaptcha.render("grecaptcha", {
                    sitekey: this.sitekey,
                    callback: this.submit
                });
            }, 200);
        }
    },
    mounted() {
        this.loaded();
    }

};
