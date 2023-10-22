<template>
  <div class="container">
    <vue-particles
        class="particles"
        color="#dedede"
        :particleOpacity="0.3"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="1"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <img src="@/assets/img.png" alt="Website Logo" class="logo">
    <div class="content">
      <h1 class="welcome-title">Welcome to join us！</h1>
      <p class="welcome-description">Thank you for choosing our platform. Please confirm your email address to continue.</p>
      <el-alert
          v-if="verificationSuccess"
          type="success"
          :closable="false"
          show-icon
          title="Email verification successful !"
      ></el-alert>
      <el-alert
          v-if="!verificationSuccess && errorMessage"
          type="error"
          :closable="false"
          show-icon
          title="Email verification failed !"
          :description="errorMessage"
      ></el-alert>
      <el-button v-if="verificationSuccess" type="success" class="login-button" @click="goToLogin">Back to login</el-button>
    </div>
  </div>
</template>



<script>

export default {
  data() {
    return {
      verificationSuccess: false,
      errorMessage:""
    };
  },
  created() {
    this.verifyEmail();
  },
  methods: {
    goToLogin() {
      this.$router.push("/");
    },
    async verifyEmail() {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      const registrationTimestamp = urlParams.get("registrationTimestamp");
      const passwordToken = urlParams.get("passwordToken");


      try {
        const response = await this.$axios.get(this.$httpurl + '/user/registrationVerification', {
          params: {
            email: email,
            registrationTimestamp: registrationTimestamp,
            passwordToken: passwordToken
          }
        });

        if (response.data.code === 200) {
          console.log(response.data);
          this.verificationSuccess = true;
        } else {
          this.verificationSuccess = false;
          this.errorMessage = response.data.msg;  // Changed from "response.msg" to "response.data.msg"
          this.$message.error(this.errorMessage);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }
};
</script>

<style scoped>
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;  /* 使用Arial字体，你也可以选择其他的字体 */
}

.content {
  background-color: rgba(255, 255, 255, 0.95);  /* 更加明亮的背景 */
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);  /* 添加阴影 */
  margin-top: 40px;
  padding: 30px 20px;  /* 增加垂直间距 */
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 200px;
  max-width: 100%;
  height: auto;
  margin-bottom: 40px;
}

.login-button {
  margin-top: 20px;  /* 添加按钮的间距 */
}

.welcome-title {
  font-size: 1.8em;  /* 调整字体大小 */
  margin-bottom: 15px;  /* 增加间距 */
  color: #333;  /* 字体颜色 */
}

.welcome-description {
  font-size: 1em;
  margin-bottom: 25px;  /* 增加间距 */
  color: #666;  /* 字体颜色 */
  text-align: center;  /* 文本居中 */
}
</style>

