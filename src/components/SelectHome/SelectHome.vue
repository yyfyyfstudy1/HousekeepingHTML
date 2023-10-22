<template>
  <div style="height: 100vh">
    <Header></Header>
    <audio id="notificationSound" src="../../assets/y1871.mp3" preload="auto"></audio>
    <div class="home-page" style="background-color: #0D1E48;">
      <el-card class="card" shadow="hover">
        <img src="../../assets/findWorker.png" alt="Logo 1">
        <div class="card-text">
          <h3>I am employee</h3>
          <el-button type="primary" @click="navigateToPage1">post your task</el-button>
        </div>
      </el-card>

      <el-card class="card" shadow="hover">
        <img src="../../assets/findJob.png" alt="Logo 2">
        <div class="card-text">
          <h3>I am tasker</h3>
          <el-button type="primary" @click="navigateToFindJob">find your job</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue"
import store from '../../store'; // 导入Vuex store
export default {
  components: {Header},
  mounted() {
    this.askForSoundPermission();
  },
  methods: {
    navigateToPage1() {
      this.$router.push("/EmployerPostJob");
    },
    navigateToFindJob() {
      this.$router.push("/findJob");
    },
    checkAndAskForSoundPermission() {
      if (!store.getters.isSoundAccepted) {
        this.askForSoundPermission();
      }
    },
    askForSoundPermission() {
      this.$confirm('Do you want to turn on notification sounds?', 'Notification sounds', {
        confirmButtonText: 'Yes, turn on',
        cancelButtonText: 'No, thanks',
        type: 'info'
      }).then(() => {
        this.soundEnabled = true;
        store.dispatch('acceptSound');  // 当用户同意播放声音时，触发 Vuex action
        // 可以在此处播放一个音频文件来“解锁”浏览器的自动播放限制
        let sound = document.getElementById('notificationSound');
        sound.play();
      }).catch(() => {
        // 用户选择了“不，谢谢”
      });
    },
  }
  // 组件逻辑
}
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 20px;
  background: linear-gradient(to bottom, #0D1E48, #1F3A68);
}

.card {
  width: 300px;
  text-align: center;
  background-color: white;
  margin-bottom: 150px;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.card-text h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.el-button {
  background-color: #007BFF;
  border-color: #007BFF;
  font-weight: bold;
  letter-spacing: 1px;
}

.el-button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
