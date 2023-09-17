<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="width: 70%; margin: 40px auto 0;">
      <el-steps :active="active" finish-status="success" class="custom-steps centered-steps">
        <el-step title="Employer is confirm"></el-step>
        <el-step title="Labor is arrived"></el-step>
        <el-step title="Task have finished"></el-step>
        <el-step title="Payment successful"></el-step>
      </el-steps>
      <div>
      </div>
      <transition name="fade" mode="out-in">
        <div :key="active" style="margin-top: 30px">
          <div v-if="active === 1">
            <h2 style="color: #cccccc; width: 80%; text-align: center;  margin-left: 60px;">
              Employer has confirm the order, Please bring the necessary tools and go to
              <span class="highlight">{{taskDetail.taskLocation}}</span> at local time :
              <span class="highlight">{{ formatDate(taskDetail.taskBeginTime) }}</span>
            </h2>
            <MyMap v-if="mapsApiLoaded"
                   :startLocation="startLat"
                   :endLocation="startLng"
                   style="margin-top: 20px"></MyMap>

          </div>
          <div v-if="active === 2">
            骑手正在赶往商家，准备取货。
          </div>
          <div v-if="active === 3">
            骑手已经取到货，正在为你送货。
          </div>
          <div v-if="active === 4">
            骑手已经送达，感谢你的使用！
          </div>
        </div>
      </transition>
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

</style>
