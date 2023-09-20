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
      <div class="user-info">
        <span style="font-weight: bold; color: gold;">{{ userName }}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/selectHome">Home</el-dropdown-item>
            <el-dropdown-item command="/profile">My profile</el-dropdown-item>
            <el-dropdown-item command="/myTask">My task</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  methods: {
    handleCommand(command) {
      this.$router.push(command);
    }
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
  border-bottom: 3px solid #ffda00;
  color: white;
}

.left-content {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  padding-top: 30px;
}

.right-content {
  display: flex;
  align-items: center;
}

.user-profile img {
  height: 40px;
  border-radius: 50%;
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
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
</style>
