<template>
  <div class="outer-container">
    <Header></Header>
    <!-- 左侧大图片 -->
    <div class="left-section">
      <img src="../../assets/img_3.png" alt="大图片"/>
    </div>

    <!-- 右侧表单 -->
    <h2 style="text-align: center; margin-top: 30px; color: white">Get your part-time job</h2>
    <div class="right-section">
      <!-- 用户输入简历表单 -->
      <div v-for="(resume, index) in resumes" :key="index">
        <el-form :model="resume" label-position="top">
          <el-form-item label="Work Experience" class="custom-label">
            <el-input type="textarea" v-model="resume.inputText"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-form :model="resumeForm">
        <el-form-item label="job type" class="custom-label">
          <el-select v-model="resumeForm.jobType" placeholder="Please select"  @change="handleSelectionChange">
            <el-option v-for="jobType in jobTypes" :key="jobType.id" :label="jobType.taskCategory" :value="jobType.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Expected Salary" class="custom-label">
          <el-input v-model="resumeForm.expectedSalary" v-numeric-input></el-input>
        </el-form-item>
      </el-form>

      <!-- 选择标签布局 -->
      <div class="tag-layout" v-if="resumeForm.jobType">
        <!-- 在用户选择工作类型后显示的内容 -->
        <h2 style="color: white">You have choose job category {{ resumeForm.jobType }}</h2>
        <!-- 在这里添加您的标签或其他内容 -->
        <div class="container">
          <el-checkbox-group v-model="selectedTags">
            <el-checkbox v-for="tag in tags" :label="tag" :key="tag.tagId">{{ tag.tagName }}</el-checkbox>
          </el-checkbox-group>
          <div v-if="selectedTags.length > 0" class="selected-tags">
            <p style="color: white">selected tags：</p>
            <span class="tag" v-for="(tag, index) in selectedTags" :key="index" style="margin-top: 10px">{{ tag.tagName }}</span>
          </div>
        </div>
      </div>


      <el-button @click="handleSubmit" type="primary" style="margin-top: 20px">submit</el-button>
      <el-button @click="addResume" type="primary" style="margin-top: 10px">Add one work experience</el-button>

    </div>
  </div>

</template>

<script src="./FindJob.js">

</script>

<style>
/* 隐藏滚动条轨道，但保留滚动功能 */

.outer-container{
  background-color: #0D1E48; min-height: 100vh;  overflow: auto;
}
.outer-container::-webkit-scrollbar {
  width: 0.2em; /* 调整滚动条的宽度 */
}
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}
/* 样式可以根据您的需要进行调整 */
.left-section {
  width: 40%;
  float: left;
  margin-left: 20px;
  margin-top: 40px;
}
.selected-tags{
  margin-top: 20px;
}
/* 自定义 label 的颜色 */
.custom-label label {
  color: #ffffff; /* 这里设置你想要的颜色 */
  font-weight: bold;
}
.right-section {
  width: 50%;
  float: right;
  margin-bottom: 30px;
}

.tag-layout {
  margin-top: 20px;
}
.reply-box {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.task-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
}

.task-details img {
  max-width: 100%;
  height: auto;
}


</style>
