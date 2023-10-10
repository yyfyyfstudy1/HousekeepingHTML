
<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="width: 70%; margin: 40px auto 0; margin-bottom: 30px">
      <el-steps :active="active" finish-status="success" class="custom-steps" style="margin-left: 100px">
        <el-step title="Employer is confirm"></el-step>
        <el-step title="Tasker is arrived"></el-step>
        <el-step title="Task have finished"></el-step>
        <el-step title="Payment successful"></el-step>
      </el-steps>
      <el-button type="primary" @click="getPaypal">pay here</el-button>

      <div :key="active">

        <el-dialog :visible.sync="dialogVisible"
                   title="Your task has been take !"
                   :close-on-click-modal="false"
                   :show-close="false"
                   :close-on-press-escape="false">


          <div class="center-and-bold">
            <img :src="tasker.avatarUrl" alt="Tasker Avatar" width="100"/>
            <p>Name: {{ tasker.name }}</p>
            <p>Age: {{ tasker.age }}</p>
            <p>Phone: {{ tasker.phone }}</p>
            <p>About: {{ tasker.introduction }}</p>
            <div v-if="active === 0">
              <el-button v-if="!isConfirmed" @click="changeStatus(1)" class="statusConfirmBtn">Waiting for you to
                confirm the order
              </el-button>
            </div>
          </div>

        </el-dialog>

        <transition name="fade" mode="out-in">

          <div v-if="active === 1">
            <div class="task-center">
              <img src="../../../assets/woman-6318447_1280.jpg" width="60%">
              <h2>Your task will begin, The tasker is going to your place !</h2>
            </div>
          </div>


          <div v-if="active === 2">
            <div class="task-center">
              <h1>
                <span class="part1">The tasker has arrived</span>
                <span class="part2"> and the task </span>
                <span class="part3">starts timing</span>
              </h1>
              <span v-if="taskPhase !== 14" style="font-size: 60px; margin-top: 20px;  color: #e3ea00">{{ formattedTime }}</span>
              <span v-else style="font-size: 60px; margin-top: 20px;  color: #8d8d8d">{{ formattedTime }}</span>
              <h3 style="margin-top: 20px"><u>Have questions about timing?</u></h3>
              <h2 v-if="taskPhase === 14" style="margin-top: 40px; color: red">Tasker has paused the task</h2>
            </div>
          </div>
          <div v-if="active === 3">
            Waiting for the payment
          </div>
          <div v-if="active === 4">
            The task have finished ! waiting for your next use
          </div>
        </transition>
        <div>
          <a href="#" @click="getPaypal">
            <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-medium.png" alt="PayPal" />
          </a>
        </div>

        <div class="task-center-labor">
          <div class="task-horizontal-align-labor" @click="dumpToChatRoom">
            <img src="../../../assets/chat.png" class="task-margin-right">
            <h3 style="color: black">connect with tasker</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./StatusHandlerEmployer.js">

  export default {

  };
</script>

<style>

.custom-steps .el-step__title.is-finish {
  color: #FFF;
}

.custom-steps .el-step__title.is-wait {
  color: #aaa;
}

.custom-steps .el-step__title.is-process {
  color: #FFF;
  font-weight: bold;
}

.status-text {
  color: #FFF;
}

.center-and-bold {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* 如果你也想美化按钮，可以添加以下样式 */
.statusConfirmBtn {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
}


.task-center {
  color: #eeeeee;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-horizontal-align {
  display: flex;
  align-items: center;
  margin-top: 40px;
}

.task-margin-right {

  width: 40px;
  margin-right: 10px;
}

.part1 {
  color: #ffe600;
}

.part2 {
  color: green;
}

.part3 {
  color: #ff00c2;
}

</style>
