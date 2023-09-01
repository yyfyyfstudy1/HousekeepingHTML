<template>
  <div class="login-page">
    <img src="@/assets/logo.png" alt="Logo" class="logo">
    <el-form ref="registrationForm" :model="registerForm" label-width="80px" class="registration-form">
      <el-form-item label="Email" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="First Name" prop="firstname">
        <el-input v-model="registerForm.firstname"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastname">
        <el-input v-model="registerForm.lastname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Register</el-button>
      </el-form-item>
    </el-form>
    <!-- 遮罩层和加载图标 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-icon">
        <img src="../../assets/Gear-0.2s-200px.gif" alt="Loading...">
      </div>
    </div>
  </div>

</template>

<script src="./Register.js">

</script>

<style>
.login-page {
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

/* 遮罩层样式 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明的黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保遮罩层在最顶层 */
}

/* 加载图标样式 */
.loading-icon {
  /* 根据加载图标大小和样式来设置 */
}

.registration-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
