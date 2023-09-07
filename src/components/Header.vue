<template>
  <header class="app-header" style="background-color: #0D1E48;">
    <div class="left-content">
      <div class="logo">
        <img src="../assets/img.png" alt="网站Logo">
      </div>
      <div style="margin-left: 10px; font-size: 20px">
        <span style="font-weight: bold; color: gold;">Make it simple</span>
      </div>
    </div>
    <div class="right-content">
      <div class="user-profile">
        <img src="../assets/img_2.png" alt="用户头像">
      </div>
      <div class="user-name">
        <span style="font-weight: bold; color: gold;">{{ userName }}</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userName: 'YYF', // 替换为实际用户姓名
    };
  },
};
</script>

<style>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 10px 20px;
  border-bottom: 3px solid #ffda00; /* 添加下标线样式 */
  color: white;
}

.left-content {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  padding-top: 30px;
  /* 添加你的logo样式 */
}

.right-content {
  display: flex;
  align-items: center;
}

.user-profile img {
  height: 40px;
  border-radius: 50%;
  /* 添加你的头像样式 */
}

.user-name {
  margin-left: 10px;
  /* 添加额外的样式 */
}
</style>
