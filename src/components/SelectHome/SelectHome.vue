<template>
  <div style="height: 100vh">
    <Header></Header>
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

export default {
  components: {Header},
  methods: {
    navigateToPage1() {
      this.$router.push("/EmployerPostJob");
    },
    navigateToFindJob() {
      this.$router.push("/findJob");
    }
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
}

.card {
  width: 300px;
  text-align: center;
  background-color: white;
  margin-bottom: 150px;
  padding: 20px;
  border-radius: 10px;
}

.card img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.card-text h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
