<template>
  <div style="height: 100vh">
    <Header ref="headerComponent"></Header>
    <div class="profile-page">

      <!-- 大图片容器 -->
      <div class="scenery-container">
        <img src="../../assets/pexels-juan-pablo-serrano-arenas-904276.jpg" alt="Scenery" class="scenery-image">
      </div>
      <el-form class="profile-content">

        <!-- 容器，用于包含图片选择按钮和预览 -->
        <div class="image-container">
          <!-- 预览图片 -->
          <!-- 预览图片 -->
          <el-form-item prop="preview" v-if="avatarUrl">
            <el-image
                :src="avatarUrl"
                fit="cover"
                style="width: 110px; height: 110px; cursor: pointer; border-radius: 50%;"
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
            <el-button size="small" type="danger" class="custom-button select-file-button" @click="chooseFile">Update
              Image
            </el-button>
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

          <AddressAutocomplete v-model="address" style="width: 300px; height: 40px"></AddressAutocomplete>

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
        <!-- introduction -->
        <el-form-item class="input-container intro-container">
          <img slot="label" src="../../assets/intro.png" alt="Email Icon" class="profile-icon"/>
          <el-input
              type="textarea"
              v-model="introduction"
              placeholder="Enter introduction"
              :rows="5"
          ></el-input>
        </el-form-item>

        <div class="buttons-container">
          <el-button class="custom-button save-button" @click="updateProfile" type="primary" style="width: 230px">Update
            Profile
          </el-button>
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
  display: flex; /* 水平布局 */
  justify-content: center;
  align-items: stretch;
  height: 100vh;
  padding: 5px;
}

.scenery-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  border-top-right-radius: 150px; /* 右上角圆角 */
  height: 105%;

}

.scenery-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 使图片填充容器并裁剪任何溢出的部分 */
}

.profile-content {
  flex: 1; /* 使它占据右侧的空间 */
  max-width: 550px;
  height: 100%;
  border-radius: 20px;
  padding: 20px;
  color: white;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.input-container {
  display: flex;
  align-items: stretch;
  margin-bottom: 15px;
  margin-left: 20%;
  padding-left: 5%;
}

.buttons-container {
  display: flex;
  padding-top: 20px;
  justify-content: center; /* 使子元素水平居中 */
  padding-bottom: 10px;
}

/* 使用相同的宽度设置 */
.input-container, .buttons-container {
  width: 80%;
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

.el-textarea .el-textarea__inner {
  padding: 10px 15px;
  border-radius: 15px;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  resize: none; /* 禁止用户调整大小 */
}

.input-container .el-form-item__content {
  width: 70%;
}


</style>
