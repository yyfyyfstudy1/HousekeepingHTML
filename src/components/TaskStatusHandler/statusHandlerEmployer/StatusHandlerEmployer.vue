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

      <transition name="fade" mode="out-in">
        <div :key="active">


          <div v-if="active === -1"
               style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://img.freepik.com/premium-photo/colored-dust-scattered-white-background-generative-ai_38679-2521.jpg?w=900'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            <div style="text-align: center; margin-top: 40px; padding: 50px">
              <h1 style="color: antiquewhite; background-color: rgba(0, 0, 0, 0.7); padding: 10px; width: 450px; margin-left: 200px">
                System is finding the tasker</h1>

              <div class="loadingio-spinner-pulse-u2ws171fbq">
                <div class="ldio-594040psadx">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>


          <div v-if="active === 0">
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
          </div>


          <div v-if="active === 1">
            <div class="task-center1">
              <div class="iframe-container">
                <iframe src="https://giphy.com/embed/3oriOh6akxc2f5tyTu" width="480" height="480" frameBorder="0"
                        class="giphy-embed" allowFullScreen></iframe>
              </div>
              <div class="info-box">
                <h2><i class="el-icon-time"></i> Your task will begin soon!</h2>
                <p style="margin-top: 10px; margin-bottom: 10px">The tasker is on the way to your place. Please ensure
                  your phone is online for communication.</p>
                <div class="loading-bar">
                  <div class="loading-fill"></div>
                </div>
              </div>
            </div>
          </div>


          <div v-if="active === 2">
            <div class="task-center">
              <h1>
                <span class="part1">The tasker has arrived</span>
                <span class="part2"> and the task </span>
                <span class="part3">starts timing</span>
              </h1>
              <span v-if="taskPhase !== 14"
                    style="font-size: 60px; margin-top: 20px;  color: #e3ea00">{{ formattedTime(time) }}</span>
              <span v-else style="font-size: 60px; margin-top: 20px;  color: #8d8d8d">{{ formattedTime(time) }}</span>
              <h3 style="margin-top: 20px"><u>Have questions about timing?</u></h3>
              <h2 v-if="taskPhase === 14" style="margin-top: 40px; color: red">Tasker has paused the task</h2>
            </div>
          </div>
          <div v-if="active === 3">


            <div class="payment-container">

              <!-- 左侧图片区 -->
              <div class="image-container">
                <img src="../../../assets/woman-6318447_1280.jpg" alt="Description of the image">
              </div>

              <!-- 右侧支付信息区 -->
              <div class="info-container">
                <h2 style="color: #eeeeee; margin-bottom: 40px">Tasker has finished the task, below is the payment
                  information</h2>
                <h3 style="color: #ff00c2; margin-bottom: 30px"> Task duration: {{
                    formattedTime2(laborWorkDuration)
                  }}</h3>

                <!-- 支付图标容器 -->
                <div class="payment-icons">
                  <a href="#" @click="getPaypal">
                    <img src="../../../assets/paypal.png"
                         alt="PayPal"/>
                  </a>
                  <a href="#" @click="getPaypal">
                    <img src="../../../assets/alipay.png"
                         alt="PayPal"/>
                  </a>
                  <a href="#" @click="getPaypal">
                    <img src="../../../assets/wechat.png"
                         alt="PayPal"/>
                  </a>
                </div>


                <!-- 这里可以添加其他支付信息和元素，如文本、按钮等 -->
                <p style="margin-top: 30px; color: #ffda00; text-decoration: underline;">IF YOU HAVE ANY ISSUE, PLEASE
                  CONTACT US</p>
              </div>

            </div>


          </div>
          <div v-if="active === 4">
            The task have finished ! waiting for your next use
          </div>

          <div class="task-center-labor">
            <div class="task-horizontal-align-labor" @click="dumpToChatRoom">
              <img src="../../../assets/chat.png" class="task-margin-right">
              <h3 style="color: black">connect with tasker</h3>
            </div>
          </div>
        </div>
      </transition>

      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-container">
          <h1 style="color: #eeeeee; margin-bottom: 30px">Waiting for paypal server response...</h1>
          <div class="loading-icon">

            <div class="loadingio-spinner-bean-eater-k18hctp89re">
              <div class="ldio-9sb7vxzmnl8">
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script src="./StatusHandlerEmployer.js">

export default {};
</script>

<style src="../../../../public/test2.css"></style>
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

.task-center1 {
  color: #eeeeee;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(circle at center, black 0%, black 370px, #0D1E48 450px, #0D1E48 100%);
  padding-bottom: 30px;
  padding-top: 40px;
  border-radius: 30px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


.payment-container {
  display: flex;
  background-color: rgba(255, 255, 255, 0.1); /* 透明度可以根据你的深色背景进行调整 */
  border-radius: 10px; /* 圆角效果 */
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.image-container {
  flex: 1; /* 意味着左边图片和右边支付信息的宽度将平分容器 */
  padding-right: 20px;
}

.image-container img {
  max-width: 100%;
  border-radius: 10px; /* 图片圆角效果 */
}

.info-container {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 使支付信息在垂直方向上居中 */
}

.payment-icons {
  display: flex;
  gap: 30px; /* 设置图标之间的间隙 */
  margin-top: 20px;
}

.payment-icons a img {
  width: 70px; /* 或根据需要设置其他大小 */
  transition: transform 0.3s; /* 图标点击效果 */
}

.payment-icons a:hover img {
  transform: scale(1.1); /* 当鼠标悬停在图标上时，图标会稍微放大 */
}


.task-center {
  text-align: center;
  padding: 20px;
}

.fadeIn {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.info-box {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.loading-bar {
  width: 100%;
  height: 20px;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}

.loading-fill {
  height: 100%;
  width: 0; /* 初始状态的宽度 */
  background-color: green; /* 初始状态的颜色 */
  position: absolute;
  animation: fillLoadingBar 5s infinite; /* 5s为动画时长，可以根据需求调整 */
}

@keyframes fillLoadingBar {
  0% {
    width: 0%;
    background-color: green;
  }
  100% {
    width: 100%;
    background-color: red;
  }
}

.iframe-container {
  width: 480px;
  height: 310px; /* iframe原始高度的一半 */
  overflow: hidden;
  position: relative;
}

.giphy-embed {
  position: absolute;
  top: 0; /* 使iframe定位在容器的顶部 */
}
</style>
