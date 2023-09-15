<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="profile-page" style="background-color: #0D1E48;">
      <el-form class="profile-content">

        <!-- Name Field -->
        <el-form-item class="input-container">
          <img slot="label" src="../../assets/name.png" alt="Name Icon" class="profile-icon"/>
          <el-input v-model="name" placeholder="Enter name"></el-input>
        </el-form-item>

        <!-- Address Field -->
        <el-form-item class="input-container">
          <img slot="label" src="../../assets/address.png" alt="Address Icon" class="profile-icon"/>
          <el-input v-model="address" placeholder="Enter address"></el-input>
        </el-form-item>

        <!-- Phone Field -->
        <el-form-item class="input-container">
          <img slot="label" src="../../assets/phone.png" alt="Phone Icon" class="profile-icon"/>
          <el-input v-model="phone" placeholder="Enter phone"></el-input>
        </el-form-item>

        <!-- Email Field -->
        <el-form-item class="input-container">
          <img slot="label" src="../../assets/email.png" alt="Email Icon" class="profile-icon"/>
          <el-input v-model="email" placeholder="Enter email"></el-input>
        </el-form-item>

        <!-- 保存按钮 -->
        <el-form-item class="input-container">
          <div style="flex: 1;"></div> <!-- 用于将按钮推到右侧 -->
          <el-button class="save-button" @click="updateProfile" type="primary">Save</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script src="./Profile.js">
</script>

<style>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 5px;
}

.profile-content {
  width: 100%;
  max-width: 500px; /* 可以调整最大宽度 */
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* 输入框间距 */
  margin-left: 40%; /* 输入框间距 */
}

.profile-icon {
  width: 50px;
  height: 50px;
  margin-right: 15px; /* 图标与输入框间距 */
  margin-top: 15px;
}

.save-button {
  border: 2px solid #ffda00 !important;  /* 改变边框颜色 */
  color: #ffda00 !important; /* 改变文字颜色 */
  background-color: transparent !important;  /* 透明背景 */
  padding: 10px 15px;
  border-radius: 15px;
  box-shadow: none !important;  /* 移除 Element UI 的默认阴影效果 */
}

.input-container:last-child {
  justify-content: flex-end;  /* 将保存按钮推到最右侧 */
}

.el-input {
  width: 100%;
}

.el-input__inner {
  padding: 10px 15px;
  border-radius: 15px;
  //border: 2px solid #0D1E48;
  border: 2px solid white;
  background-color: transparent;
  color: white; /* 根据背景色调整文字颜色 */
}

</style>
