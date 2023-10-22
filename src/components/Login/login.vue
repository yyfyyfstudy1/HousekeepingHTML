<template>
  <div class="login-page">
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
    <img src="../../assets/img.png" alt="Logo" class="logo">
    <el-form class="login-form" ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="Email">
        <el-input v-model="loginForm.email" placeholder="enter email"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="loginForm.password" placeholder="enter password"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="loginPress">Login</el-button>
        <el-button type="danger" @click="registerPress">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./login.js">
</script>

<style scoped>
.particles {
  position: fixed; /* Fixed position */
  top: 0;
  left: 0;
  width: 100vw; /* Viewport width */
  height: 100vh; /* Viewport height */
  z-index: -1; /* Place it behind other content */
}
.login-page {
  background-color: transparent;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 200px;
  max-width: 100%; /* 确保图片不会超出容器的宽度 */
  height: auto; /* 让高度自适应 */
  margin-bottom: 10px;
}

.login-form {
  width: 300px;
  background-color: #0D1E48;
  padding: 40px;
  border-radius: 5px;
}
</style>
