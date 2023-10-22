<template>
  <header class="app-header" style="background-color: #0D1E48;">
    <audio id="notificationSound" src="../assets/y1871.mp3" preload="auto"></audio>
    <div class="left-content">
      <div class="logo">
        <img src="../assets/img.png" alt="网站Logo">
      </div>
      <div style="margin-left: 10px; font-size: 20px">
        <span style="font-weight: bold; color: gold;">Make it simple</span>
      </div>


      <div class="nav-links">
        <span class="nav-link" @click="navigateTo('/selectHome')">Home</span>
        <span class="nav-link" @click="navigateTo('/calendar')">Calendar</span>
        <span class="nav-link" @click="navigateTo('/chatRoom?role=employer')">Communication</span>
        <span class="nav-link" @click="navigateTo('/mytask')">Task Script</span>
      </div>


      <div class="notification-wrapper">
        <img src="../assets/notification.png" width="40px" height="40px" @click="gotoMessages">
        <div class="message-count">{{ messageCount }}</div>
      </div>
    </div>
    <div class="right-content">
      <div class="user-profile">
        <el-image
            :src="avatarUrl"
            fit="cover"
            style="width: 40px; height: 40px; cursor: pointer; border-radius: 50%;"
        ></el-image>

      </div>
      <div class="user-info">
        <span style="font-weight: bold; color: gold;">{{ userName }}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/profile">My profile</el-dropdown-item>
            <el-dropdown-item command="logout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script src="./Header.js">

</script>

<style>

.notification-wrapper {
  position: relative;
  display: inline-block; /* 使得封装器的大小适应图片大小 */
  width: 40px;
  height: 40px;
  margin-left: 500px;
}

.message-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red; /* 使用红色背景表示通知 */
  color: white; /* 文字颜色为白色 */
  border-radius: 50%; /* 圆形表示 */
  padding: 2px 5px; /* 调整内边距以适应内容 */
  font-size: 12px; /* 调整字体大小 */
  min-width: 20px; /* 确保有足够的空间显示数字 */
  text-align: center; /* 文本居中 */
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 10px 20px;
  border-bottom: 3px solid #ffda00;
  color: white;
}

.left-content {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
}

.right-content {
  display: flex;
  align-items: center;
}

.user-profile img {

}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.el-icon-arrow-down {
  background-color: transparent;
  font-size: 20px;
  color: gold;
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.nav-links {
  display: flex;
  align-items: center;
  margin-left: 40px;  /* Adjust spacing between logo and nav-links */
}

.nav-link {
  margin: 0 15px;  /* Adjust spacing between each nav-link */
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link:hover {
  color: gold;  /* Change color on hover */
}

</style>
