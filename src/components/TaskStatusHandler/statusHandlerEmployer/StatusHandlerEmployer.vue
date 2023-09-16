<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="width: 70%; margin: 40px auto 0;">
      <el-steps :active="active" finish-status="success" class="custom-steps">
        <el-step title="Employer is confirm"></el-step>
        <el-step title="Labor is arrived"></el-step>
        <el-step title="Task have finished"></el-step>
        <el-step title="Payment successful"></el-step>
      </el-steps>
      <div>
        <el-button v-if="!isConfirmed" @click="changeStatus(1)">Waiting for you to confirm the order</el-button>

        <!--        <el-button @click="changeStatus(2)">2</el-button>-->
<!--        <el-button @click="changeStatus(3)">3</el-button>-->
<!--        <el-button @click="changeStatus(4)">4</el-button>-->
      </div>
      <transition name="fade" mode="out-in">
        <div :key="active">
          <div v-if="active === 1">
            Labor is on the way
          </div>
          <div v-if="active === 2">
           Labor is working....
          </div>
          <div v-if="active === 3">
            Waiting for the payment
          </div>
          <div v-if="active === 4">
            The task have finished ! waiting for your next use
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script src="./StatusHandlerEmployer.js">
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
