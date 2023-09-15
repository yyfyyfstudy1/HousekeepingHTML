<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <h1 style="text-align: center; margin-top: 20px; color: white;">Task Detail</h1>
    <el-container style="width: 70%; margin-left: 15%; margin-top: 10px">
      <el-main style="width: 100%; margin: 0 auto;">
        <el-form ref="taskForm" :model="task" label-width="80px">
          <el-form-item label="Title" prop="title">
            <el-input v-model="task.title"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="content">
            <el-input v-model="task.describe" type="textarea" :rows="5"></el-input>
          </el-form-item>
<!--          upload image -->
          <el-form-item label="Image" prop="image">
            <!-- 使用自定义的输入框触发文件选择 -->
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none;"
                @change="handleFileChange"
            />
            <el-button size="small" type="danger" style="width: 300px" @click="chooseFile">Select File</el-button>
          </el-form-item>

          <!-- 预览图片 -->
          <el-form-item label="Preview" prop="preview"  v-if="task.imageUrl">
            <!-- 使用el-image来显示和预览图片 -->
            <el-image
                :src="task.imageUrl"
                fit="contain"
                style="max-width: 200px; max-height: 200px; cursor: pointer;"
            ></el-image>

          </el-form-item>
          <el-form-item label="Begin Time" prop="taskTime">
            <el-date-picker
                v-model="task.taskDate"
                type="date"
                placeholder="Select Date"
                style="width: 150px;"
            ></el-date-picker>
            <el-time-picker
                v-model="task.taskTime"
                placeholder="Select Time"
                style="width: 150px; margin-left: 20px"
            ></el-time-picker>
          </el-form-item>

          <el-form-item label="Duration" prop="duration">
            <div style="display: flex; align-items: center;">
              <el-input-number
                  v-model="task.duration"
                  :min="0"
                  :max="100"
                  controls-position="right"
                  step="1"
              ></el-input-number>
              <h4 style="margin-left: 10px; color: white;">/ HOUR</h4>
            </div>
          </el-form-item>

          <el-form-item label="Address" prop="location">
            <el-input v-model="task.location"></el-input>
          </el-form-item>
          <el-form-item label="Salary" prop="reward">
            <el-input v-model="task.salary"></el-input>
          </el-form-item>
          <el-form-item label="Task Type" prop="type">
            <el-select v-model="task.jobCategory" placeholder="Please select" @change="handleSelectionChange">
              <el-option v-for="jobType in jobTypes" :key="jobType.id" :label="jobType.taskCategory"
                         :value="jobType.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 选择标签布局 -->
        <div class="tag-layout-2" v-if="task.jobCategory">
          <!-- 在这里添加标签或其他内容 -->
          <div class="post-job-container">
            <el-checkbox-group v-model="selectedTags">
              <el-checkbox v-for="tag in tags" :label="tag" :key="tag.tagId">{{ tag.tagName }}</el-checkbox>
            </el-checkbox-group>
            <div v-if="selectedTags.length > 0" class="selected-tags">
              <p style="color: white">selected tags：</p>
              <span class="tag" v-for="(tag, index) in selectedTags" :key="index" style="margin-top: 10px">{{
                  tag.tagName
                }}</span>
            </div>
            <el-button type="primary" @click="submitForm" style="margin-top: 20px">提交</el-button>
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script src="./PostJobDetail.js"></script>

<style scoped>
/* 在这里添加需要的样式 */

/* 样式可以根据您的需要进行调整 */
.left-section {
  width: 40%;
  float: left;
  margin-left: 20px;
  margin-top: 40px;
}

.selected-tags {
  margin-top: 20px;
}

.post-job-container {
  margin-left: 80px;
  margin-bottom: 30px;
}

/* 自定义 label 的颜色 */
.custom-label label {
  color: #ffffff; /* 这里设置你想要的颜色 */
  font-weight: bold;
}


</style>
