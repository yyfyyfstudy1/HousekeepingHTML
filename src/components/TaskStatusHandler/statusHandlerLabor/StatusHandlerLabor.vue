<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="width: 70%; margin: 40px auto 0;">
      <el-steps :active="active" finish-status="success" class="custom-steps centered-steps">
        <el-step title="Employer is confirm"></el-step>
        <el-step title="Tasker is arrived"></el-step>
        <el-step title="Task have finished"></el-step>
        <el-step title="Payment successful"></el-step>
      </el-steps>
      <div>
      </div>
      <transition name="fade" mode="out-in">
        <div :key="active" style="margin-top: 30px; margin-bottom: 40px">

          <div v-if="active === 0">
            <h1 style="color: #f7f7f7; text-align: center; margin-top: 40px">
              <span style="color: #ffda00"> Waiting for </span> <span style="color: #ffda00">the employer</span> <span  style="color: #ffda00">confirm...</span>
            </h1>
            <div class="loadingio-spinner-ripple-ft0fvxndxpi" style="margin-left: 40%; margin-top: 30px">
              <div class="ldio-ni5ktxfpg9">
                <div></div>
                <div></div>
              </div>
            </div>

            <!-- 下面是带有下划线的提示部分 -->
            <div style="text-align: center; margin-top: 20px;">
              <p style="text-decoration: underline; color:lightgoldenrodyellow">Tip 1: Please be patient.</p>
              <p style="text-decoration: underline; color: #ff00c2; margin-top: 10px">Tip 2: Ensure your internet connection is stable.</p>
              <p style="text-decoration: underline;  color: #41FF33;  margin-top: 10px">Tip 3: If waiting too long, consider contacting the employer directly.</p>
            </div>

          </div>


          <div v-if="active === 1">
            <h2 style="color: #cccccc; width: 80%; text-align: center;  margin-left: 60px;">
              Employer has confirm the order, Please bring the necessary tools and go to
              <span class="highlight">{{ taskDetail.taskLocation }}</span> at local time :
              <span class="highlight">{{ formatDate(taskDetail.taskBeginTime) }}</span>
            </h2>
            <MyMap v-if="mapsApiLoaded"
                   :startLocation="laborAddress"
                   :endLocation="taskAddress"
                   style="margin-top: 20px"></MyMap>

            <el-button @click="confirmArrived(2)" size="big" type="success"
                       style="margin-top: 20px; color: #5b5b5b; font-weight: bold; margin-left:40%">
              I have arrived

            </el-button>
          </div>
          <div v-if="active === 2">
            <div class="task-center">
              <h2>The timer has started, please start the task immediately</h2>
              <span style="font-size: 60px; margin-top: 20px; color: #e3ea00">{{ formattedTime }}</span>
              <!-- 第一个按钮 -->
              <el-button @click="showConfirmDialog(1)" style="width: 250px; margin-top: 30px" type="success">
                Task is completed
              </el-button>


              <!-- 第二个按钮 -->
              <el-button v-if="timer != null" @click="showConfirmDialog(2)" type="danger"
                         style="margin-top: 20px; width: 250px">
                Meet issue, stop timer
              </el-button>
              <el-button v-else @click="showConfirmDialog(3)" type="warning" style="margin-top: 20px; width: 250px">
                start with timer
              </el-button>

            </div>

            <!-- 确认框 -->
            <el-dialog
                :visible="confirmDialogVisible"
                title="Confirmation"
                @confirm="handleConfirm"
                @cancel="handleCancel"
            >
              <span v-if="currentAction === 1">Continue with task completion?</span>
              <span v-else-if="currentAction === 2">Continue with stopping the timer?</span>
              <span v-else>Continue with start the timer?</span>
              <!-- 添加确认按钮和取消按钮 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">Cancel</el-button>
                <el-button type="primary" @click="handleConfirm">Confirm</el-button>
              </span>
            </el-dialog>


          </div>
          <div v-if="active === 3">
            <div class="labor-phase-3">
              <h1 style="color: #fcf236">Congratulate, you have finished your task !!!</h1>
              <h2 style="margin-top: 20px">Waiting for employer payment .....</h2>
              <FireworksEffect/>
            </div>

          </div>
          <div v-if="active === 4">
            <div class="task-center">
              employer has finished the payment, you can check your balance
            </div>

          </div>
        </div>
      </transition>

      <div class="task-center-labor">
        <div class="task-horizontal-align-labor" @click="dumpToChatRoom">
          <img src="../../../assets/chat.png" class="task-margin-right">
          <h3 style="color: black">connect with employer</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./StatusHandlerLabor.js">
</script>

<style>
.centered-steps {
  display: flex;
  justify-content: center; /* 添加 justify-content: center */
  align-items: center; /* 添加 align-items: center */
}

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


.highlight {
  color: #fcf236; /* 你希望使用的显眼的颜色 */
}

.task-center-labor {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 1000;
  background-color: #FFFFFF; /* 白色背景 */
  border-radius: 10px; /* 边框圆角 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15); /* 阴影效果 */
  padding: 20px; /* 内部填充，使内容不会贴在卡片的边缘 */
}

.task-horizontal-align-labor {
  display: flex;
  padding: 5px;
  align-items: center; /* 垂直居中对齐项目 */
}

.task-margin-right {
  margin-right: 10px; /* 右边距为10px */
}

.labor-phase-3 {
  color: #eeeeee;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
}


.container-waiting {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /*background-size: cover; !* 图片覆盖整个容器 *!*/
  /*background-position: center; !* 图片居中 *!*/
  /*background-repeat: no-repeat; !* 不重复 *!*/
  /*background-attachment: fixed; !* 图片不随内容滚动 *!*/
  backdrop-filter: blur(10px); /* 使背景稍微模糊，有助于提高内容的可读性 */
}


.loading-demo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
}


@keyframes ldio-ni5ktxfpg9 {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

.ldio-ni5ktxfpg9 div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-ni5ktxfpg9 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.ldio-ni5ktxfpg9 div:nth-child(1) {
  border-color: #d74946;
  animation-delay: 0s;
}

.ldio-ni5ktxfpg9 div:nth-child(2) {
  border-color: #0069ce;
  animation-delay: -0.5s;
}

.loadingio-spinner-ripple-ft0fvxndxpi {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent; /* 将此值更改为 transparent */

}

.ldio-ni5ktxfpg9 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}

.ldio-ni5ktxfpg9 div {
  box-sizing: content-box;
}

/* generated by https://loading.io/ */

</style>
