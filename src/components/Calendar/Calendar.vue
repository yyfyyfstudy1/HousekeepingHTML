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
        <div class="dateInfo">{{ formattedSelectedDate }}</div>

        <div class="task"
             v-for="task in employerTask"
             :key="task.taskId"
             @click="navigateToTaskStatusHandler(1, task.taskId)"
        >
          <i class="el-icon-s-claim" style="color: green"></i>
          <div style="margin-left: 10px">
            {{ task.taskDescribe }}
          </div>
          <div class="button-container">
            <div>
              <el-button type="primary" icon="el-icon-edit" @click="editTask(task.taskId)">Modify</el-button>
            </div>
            <div style="margin-top: 10px">
              <el-button type="danger" icon="el-icon-delete" @click="deleteTask(task.taskId, 1)">Delete</el-button>
            </div>
          </div>
        </div>

        <div class="task"
             v-for="task in taskerTask"
             :key="task.taskId"
             @click="navigateToTaskStatusHandler(2, task.taskId)">
          <i class="el-icon-s-claim" style="color: darkred"></i>
          <div style="margin-left: 10px">
            {{ task.taskDescribe }}
          </div>
          <div class="btn-container2">
            <el-button type="primary" icon="el-icon-delete" @click="deleteTask(task.taskId, 2)">cancel</el-button>
          </div>
        </div>
      </div>

      <div v-else>
        <img src="../../assets/mubariz-mehdizadeh-t3zrEm88ehc-unsplash.jpg" width="700px">
      </div>
    </div>

    <el-dialog :visible.sync="editDialogVisible" title="Edit Task" width="50%" :before-close="handleEditDialogClose"
               class="use-dialog">
      <el-form :model="editingTask">
        <el-form-item label="Task Begin Time">
          <el-date-picker v-model="editingTask.taskBeginTime" type="datetime"
                          placeholder="Select date and time"></el-date-picker>
        </el-form-item>
        <el-form-item label="Task Location">
          <el-input v-model="editingTask.taskLocation" style="width: 300px; height: 40px"></el-input>
        </el-form-item>
        <el-form-item label="Task Describe">
          <textarea v-model="editingTask.taskDescribe" placeholder="Enter task description"
                    style="height: 100px; width: 90%; padding: 10px"> </textarea>
        </el-form-item>
        <el-form-item label="Task Title">
          <el-input v-model="editingTask.taskTitle" placeholder="Enter task title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleUpdateTask">Update</el-button>
    </span>
    </el-dialog>


  </div>
</template>

<script src="./Calendar.js">
</script>

<style>
.use-dialog .el-input__inner {
  color: black;
}

.taskInfo {
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
  color: #ffda00;
  margin-bottom: 20px;
}

.task {
  display: flex;

}

.button-container {
  display: flex;
  flex-direction: column;
}

.btn-container2 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 如果需要，您可以设置具体的高度 */
  margin-top: 5%;
}


.icon {
  width: 20px;
  height: 20px;
  background-color: white; /* 暂时使用白色背景代表图标，你可以替换成真实图标 */
  margin-right: 20px;
  border-radius: 50%; /* 圆形图标 */
}


</style>
