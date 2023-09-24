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
          <div v-if="active === 1" >
            <h2 style="color: #cccccc; width: 80%; text-align: center;  margin-left: 60px;">
              Employer has confirm the order, Please bring the necessary tools and go to
              <span class="highlight">{{taskDetail.taskLocation}}</span> at local time :
              <span class="highlight">{{ formatDate(taskDetail.taskBeginTime) }}</span>
            </h2>
            <MyMap v-if="mapsApiLoaded"
                   :startLocation="startLat"
                   :endLocation="startLng"
                   style="margin-top: 20px"></MyMap>

            <el-button @click="confirmArrived(2)" size="big" type="success" style="margin-top: 20px; color: #5b5b5b; font-weight: bold; margin-left:40%">
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
              <el-button v-if="timer != null"  @click="showConfirmDialog(2)" type="danger" style="margin-top: 20px; width: 250px">
                Meet issue, stop timer
              </el-button>
              <el-button v-else  @click="showConfirmDialog(3)" type="warning" style="margin-top: 20px; width: 250px">
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
            <div class="task-center">
              骑手正在赶往商家，准备取货。
            </div>

          </div>
          <div v-if="active === 4">
            <div class="task-center">
              骑手正在赶往商家，准备取货。
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
  justify-content: center;  /* 添加 justify-content: center */
  align-items: center;      /* 添加 align-items: center */
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
.status-text {
  color: #FFF;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
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
  border-radius: 10px;       /* 边框圆角 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);  /* 阴影效果 */
  padding: 20px;            /* 内部填充，使内容不会贴在卡片的边缘 */
}

.task-horizontal-align-labor {
  display: flex;
  padding: 5px;
  align-items: center;   /* 垂直居中对齐项目 */
}

.task-margin-right {
  margin-right: 10px;   /* 右边距为10px */
}


</style>
