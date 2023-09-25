<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="profile-page">

      <el-form class="profile-content">
        <!-- 容器，用于包含图片选择按钮和预览 -->
        <div class="image-container">
          <!-- 预览图片 -->
          <el-form-item prop="preview" v-if="imageUrl">
            <el-image
                :src="imageUrl"
                fit="contain"
                style="max-width: 100px; max-height: 100px; cursor: pointer;"
            ></el-image>
          </el-form-item>
          <!-- 添加图片选择按钮 -->
          <el-form-item class="file-container">
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none;"
                @change="handleFileChange"
            />
            <!-- 使用 custom-button 类设置通用样式 -->
            <el-button size="small" type="danger" class="custom-button select-file-button" @click="chooseFile">Update Image</el-button>
          </el-form-item>
        </div>

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

        <div class="buttons-container">
          <el-button class="custom-button logout-button" @click="logOut" type="danger">Log Out</el-button>
          <el-button class="custom-button save-button" @click="updateProfile" type="primary">Save</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script src="./Profile.js">
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
}
body {
  background-color: #0D1E48;
}
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
}
.profile-content {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
}
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
.file-container {
  margin-top: 10px;
}
.input-container {
  margin-left: 20%;
  display: flex;
  align-items: stretch;
  margin-bottom: 15px;
  padding-left: 5%;
}
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
/* 使用相同的宽度设置 */
.input-container, .buttons-container {
  width: 60%;
  max-width: 500px;
  margin: 0 auto;
}
.profile-icon {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

/* 通用按钮样式 */
.custom-button {
  border: 2px solid #ffda00 !important;
  color: #ffda00 !important;
  background-color: transparent !important;
  padding: 10px 15px;
  border-radius: 15px;
  box-shadow: none !important;
}

/* Log Out 按钮特定样式 */
.logout-button {
  margin-left: 10px;
  color: #ff4444 !important;
  border-color: #ff4444 !important;
  align-self: flex-start;
}

/* Save 按钮特定样式 */
.save-button {
  align-self: flex-end;
}

.el-input {
  width: 100%;
}
.el-input__inner {
  padding: 10px 15px;
  border-radius: 15px;
  border: 2px solid white;
  background-color: transparent;
  color: white;
}
</style>
