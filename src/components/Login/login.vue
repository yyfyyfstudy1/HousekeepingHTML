<template>
  <div class="login-page">
    <img src="@/assets/logo.png" alt="Logo" class="logo">
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
.login-page {
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
}

.login-form {
  width: 300px;
  background-color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 5px;
}
</style>
