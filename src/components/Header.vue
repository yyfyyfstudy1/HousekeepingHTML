<template>
  <header class="app-header" style="background-color: #0D1E48;">
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
    navigateTo(route) {
      this.$router.push(route);
    },
    handleCommand(command) {
      this.$router.push(command);
      if (command === 'logout') {
        // 这里执行登出的逻辑
        // 1. Update the store state
        store.commit('setIsLoggedIn', false);
        store.commit('setToken', null);
        // 2. Redirect to the login page
        this.$router.push('/'); // Assuming the route path for your login page is '/login'

      }
    },
    fetchUserProfile() {
      this.$axios.get(this.$httpurl + '/user/profile', {
        params: {id: this.id}  // 根据需要动态传入用户ID
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
