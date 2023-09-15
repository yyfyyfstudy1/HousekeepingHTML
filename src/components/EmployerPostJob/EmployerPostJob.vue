<template>
  <div style="height: 100vh;   background-color: #0D1E48;">
    <Header></Header>
    <div class="centered-container">
      <div class="content">
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>

        <div v-if="selectedTags.length > 0" class="selected-tags">
          <span class="tag" v-for="(tag, index) in selectedTags" :key="index">{{ tag.tagName }}</span>
        </div>
        <el-button @click="handleButtonClick" type="success" style="margin-top: 10px">Search what you may want to do</el-button>
      </div>
      <el-checkbox-group v-model="selectedTags" class="checkbox-container">
        <el-checkbox v-for="tag in tags" :label="tag" :key="tag.tagId" class="floating-checkbox">{{
            tag.tagName
          }}
        </el-checkbox>
      </el-checkbox-group>

    </div>

    <div class="card-container">
      <el-card class="card" shadow="hover">
        <div class="card__body">
          <h3>Card Title</h3>
          <p>Card description</p>
        </div>
      </el-card>
      <el-card class="card" shadow="hover">

        <div class="card__body">
          <h3>Card Title</h3>
          <p>Card description</p>
        </div>
      </el-card>
      <el-card class="card" shadow="hover">
        <div class="card__body">
          <h3>Card Title</h3>
          <p>Card description</p>
        </div>
      </el-card>
      <el-card class="card" shadow="hover">
        <div class="card__body">
          <h3>Card Title</h3>
          <p>Card description</p>
        </div>
      </el-card>
      <el-card class="card" shadow="hover">
        <div class="card__body">
          <h3>Card Title</h3>
          <p>Card description</p>
        </div>
      </el-card>
      <el-card class="card" shadow="hover">
        <div class="card__body">
          <h3>Card Title</h3>
          <p>Card description</p>
        </div>
      </el-card>

    </div>

  </div>
</template>

<script src="./EmployerPostJob.js">
</script>

<style>
.centered-container {
  /* 原有的样式 */
  display: flex;
  top: 0; left: 0; width: 100%; height: 60%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  /* 新添加的样式 */
  background-image: url('https://images.pexels.com/photos/840810/pexels-photo-840810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');  /* 替换为实际图片路径 */
  background-size: cover;  /* 图片将会覆盖整个容器 */
  background-repeat: no-repeat;  /* 图片不会重复 */
  background-position: center;  /* 图片从中心开始 */
}


.content {
  background-color: rgba(255, 255, 255); /* 使用rgba()来设置半透明的白色背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.checkbox-container {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 500px; /* 使用100%宽度，以适应不同屏幕 */
}

.tag {
  display: inline-block;
  background-color: #1a5400;
  color: white;
  padding: 2px 6px;
  margin-right: 5px;
  border-radius: 4px;
}

.floating-checkbox {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 120px; /* 调整 checkbox 宽度 */
  margin: 5px; /* 调整 checkbox 间距 */
  transition: transform 0.2s, box-shadow 0.2s;
}

.floating-checkbox:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.tag-input {
  width: 300px;
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.5); /* 半透明白色背景 */
  border: none; /* 去掉边框 */
  border-radius: 16px;
  padding: 5px 10px;
}
.card-container {
  background-color: #0D1E48;
  display: flex;
  flex-wrap: wrap; /* 允许卡片换行 */
  justify-content: flex-start; /* 卡片靠左对齐 */
  gap: 10px; /* 卡片之间的间隙 */
  padding: 50px;
}


.card {
  width: calc(33.33% - 10px);
  height:200px;
}

.card__body {
  padding: 14px;
}
/* 媒体查询：屏幕宽度小于等于600px时 */
@media (max-width: 600px) {
  .floating-checkbox {
    width: 100%; /* 让 checkbox 在小屏幕上占满宽度 */
  }
}
</style>
