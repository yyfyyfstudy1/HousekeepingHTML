<template>
   <div class="outer-container">
     <Header></Header>
     <!-- 左侧大图片 -->
     <div class="left-section-calendar">
       <vc-calendar :attributes="attributes"
                    class="calendar"
                    is-expanded
                    v-model="selectedDate"
                    @dayclick="handleDayClick"
                    color="red"
                    is-range
       >
       </vc-calendar>
     </div>
     <div class="calendarBar">
       <div class="taskInfo" v-if="formattedSelectedDate">
         <div class="dateInfo">{{formattedSelectedDate}}</div>
         <div class="task" v-for="task in employerTask" :key="task.taskDescribe">
           <i class="el-icon-s-claim" style="color: green"></i> <!-- 代表任务的图标 -->
           <div style="margin-left: 10px">
             {{ task.taskDescribe }}
           </div>

         </div>
         <div class="task" v-for="task in taskerTask" :key="task.taskDescribe">
           <i class="el-icon-s-claim"  style="color: darkred"></i> <!-- 代表任务的图标 -->
           <div style="margin-left: 10px">
             {{ task.taskDescribe }}
           </div>
         </div>
       </div>

       <div v-else>
         <img src="../../assets/mubariz-mehdizadeh-t3zrEm88ehc-unsplash.jpg" width="700px">
       </div>
     </div>


   </div>
</template>

<script src="./Calendar.js">
</script>

<style>
.taskInfo{
  font-size: 30px;
  color: white;
}
/* 可以根据需要添加样式 */
.calendarBar {
  margin-top: 40px;
  padding-right: 15px;
  width: 50%;
  float: right;
  margin-bottom: 30px;
}
.outer-container {
  background-color: #0D1E48;
  min-height: 100vh;
  overflow: auto;
}
/* 样式可以根据您的需要进行调整 */
.left-section-calendar {
  width: 40%;
  float: left;
  margin-left: 20px;
  margin-top: 40px;
}
.vc-day-content {
  width: 60px !important;
  height: 60px !important;
  border-radius: 8px !important;
}

.taskInfo {
  font-size: 24px;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 每个任务之间的间距 */
  position: relative; /* 为底部按钮定位 */
}

.dateInfo {
  font-weight: bold;
  color:#ffda00;
  margin-bottom: 20px;
}

.task {
  display: flex;

}

.icon {
  width: 20px;
  height: 20px;
  background-color: white; /* 暂时使用白色背景代表图标，你可以替换成真实图标 */
  margin-right: 20px;
  border-radius: 50%; /* 圆形图标 */
}


</style>
