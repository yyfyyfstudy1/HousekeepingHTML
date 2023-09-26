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
        <img :src="avatarUrl" alt="用户头像">
<!--        <img src="../assets/img_2.png" alt="用户头像">-->
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
import store from "@/store";

export default {
  data() {
    return {
      userName: 'YYF', // 替换为实际用户姓名
      avatarUrl: require('@/assets/img_2.png'),
    };
  },
  computed: {
    id() {
      // Get the user from the store and return its id
      const user = store.getters.getUserInfo;
      return user.id;
    }
  },
  mounted() {
    // Automatically fetch the profile once the component is mounted
    this.fetchUserProfile();
  },
  methods: {
    handleCommand(command) {
      this.$router.push(command);
    },
    fetchUserProfile() {
      this.$axios.get(this.$httpurl + '/user/profile', {
        params: { id: this.id }  // 根据需要动态传入用户ID
      })
          .then(response => {
            if (response.data.code === 200) {
              const userData = response.data.data;
              this.userName = userData.name;
              this.avatarUrl = userData.avatarUrl;
            } else {
              console.error("Error fetching profile:", response.data.msg);
            }
          })
          .catch(error => {
            console.error("Error fetching profile:", error.response ? error.response.data : error.message);
          });
    },
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
