<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div v-if="loading" class="loading-overlay">
      <el-loading :visible="loading" text="Waiting for Job distribution" :full-screen="true">
        <div class="content">
          <img src="../../assets/Gear-0.2s-200px.gif" alt="Loading...">
          <p style="color: #000000; font-weight: bold">Loading for the job distribute...</p>
        </div>
      </el-loading>
    </div>
    <div class="card-container">
      <el-card class="outer-card" shadow="hover" v-for="(item, index) in data" :key="index">
        <h5 class="task-title">{{ item.task.taskTitle }}</h5>
        <div class="inner-card" shadow="hover" @click="handleCardClick(item.task.taskId)">
            <p  style="color: white;"><span style="color: #ffda00">Time: </span> {{ item.task.taskBeginTime }}</p>
            <p style="color: white; margin-top: 10px"><span style="color: #ffda00">Address: </span>{{ item.task.taskLocation }}</p>
            <p style="color: white; margin-top: 10px"><span style="color: #ffda00">Salary: </span>$ {{ item.task.taskSalary }}</p>
            <p style="color: white; margin-top: 10px"><span style="color: #ffda00">Estimated Time: </span>{{ item.task.taskEstimatedDuration }} / hour</p>
            <p style="color: white; margin-top: 10px">
              <span style="color: #ffda00">Task detail: </span>{{ truncate(item.task.taskDescribe, 100) }}
            </p>

          <el-image src="https://images.openai.com/blob/dc934ef7-f0cb-4f5f-bbae-51aa7b0550d9/openai-api.jpg?trim=0,0,0,0&width=3200"
                    style="width: 100px; height: 100px; margin: 0 auto; display: block; padding-top: 10px"
                    @click.stop="showBigImage(item.task.taskImageUrl)">
          </el-image>
          <div class="flex-container-gpttext">
            <img src="../../assets/robot.png" alt="System reason" style="width: 30px; height: 30px;"/>
            <p style="color: wheat; padding-left:10px">{{ truncate(item.gptReply, 100) }}</p>
          </div>
        </div>
      </el-card>
      <!-- 模态对话框 -->
      <el-dialog :visible.sync="dialogVisible" width="50%" style="background-color: #333333">
        <img :src="bigImageUrl" class="big-image" />
      </el-dialog>
    </div>
    <div class="centered-button">
      <el-button type="primary" @click="handleButtonClick" class="refreshButton">Refresh task</el-button>
    </div>
  </div>
</template>

<script src="./ShowMatchWork.js">
</script>

<style scoped>

.refreshButton {
  margin-top: 10px;
  margin-bottom: 20px;
}

.centered-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  background-color: #0D1E48;
}
.el-image {
  margin: 0 auto;
  display: block;
  width: 100px; /* 设置你希望的宽度 */
  height: 100px; /* 设置你希望的高度 */
}

.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.flex-container-gpttext {
  display: flex;
  margin-top: 15px;
  align-items: center;
}

.outer-card {
  width: 300px;
  height: 450px;
  background-color: #0D1E48;
  border-radius: 10px;
  border: 2px solid #ffda00; /* 设置边框样式 */
  margin: 10px;
}

.inner-card {
  background-color: #0D1E48;
  border-radius: 8px;
  border: 1px solid #ffffff; /* 设置边框样式 */
  padding: 10px;
  text-align: left;
}

.task-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
}

.task-details p {
  margin: 5px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* 大图的样式 */
.big-image {
  max-width: 100%;
  max-height: 100%;
}
</style>