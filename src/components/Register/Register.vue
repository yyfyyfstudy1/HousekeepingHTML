<template>
  <div class="register-page">
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
      <div class="loading-container">
        <h1 style="color: #eeeeee; margin-bottom: 30px">Waiting for Email sending...</h1>
        <div class="loading-icon">

          <div class="loadingio-spinner-bean-eater-k18hctp89re">
            <div class="ldio-9sb7vxzmnl8">
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>

</template>

<script src="./Register.js">

</script>
<style src="../../../public/test2.css"></style>

<style scoped>
.particles {
  position: fixed; /* Fixed position */
  top: 0;
  left: 0;
  width: 100vw; /* Viewport width */
  height: 100vh; /* Viewport height */
  z-index: -1; /* Place it behind other content */
}
.register-page {
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
  width: 300px;
  background-color: #0D1E48;
  padding: 40px;
  border-radius: 5px;
}
</style>
