<template>
  <div class="centered-container">
    <div class="content">
      <el-input v-model="inputValue" placeholder="请输入内容"></el-input>

      <div v-if="selectedTags.length > 0" class="selected-tags">

        <span class="tag" v-for="(tag, index) in selectedTags" :key="index">{{ tag.tagName }}</span>
      </div>
      <el-button @click="handleButtonClick" type="success" style="margin-top: 10px">点击我</el-button>
    </div>
    <el-input v-model="inputTag" placeholder="search tags" class="tag-input"></el-input>
    <el-checkbox-group v-model="selectedTags" class="checkbox-container">
      <el-checkbox v-for="tag in tags" :label="tag" :key="tag.tagId" class="floating-checkbox">{{ tag.tagName }}</el-checkbox>
    </el-checkbox-group>

  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      inputTag:'',
      tags: [],
      selectedTags: [],
      selectedTagsID:[]
    };
  },

  mounted() {
    // init the page
    this.$axios.get(this.$httpurl + '/public/taskTag/getTags').then(res => res.data).then(res => {
      console.log(res)
      if(res.code===200){
        this.tags = res.data;
      }else {
        alert("failed to get the data")
      }
    })
  },
  watch: {
    selectedTags: {
      handler(newSelectedTags) {
        this.selectedTagsID = newSelectedTags.map(tag => tag.tagId);
      },
      deep: true,
    },
  },
  methods: {
    handleButtonClick() {
      console.log("按钮被点击了！");
      this.$axios.post(this.$httpurl + '/public/tasks/postTask', {
        taskDescribe:  this.inputValue,
        taskImgURL: 'https://pic.616pic.com/ys_bnew_img/00/16/95/OjCm8gnt48.jpg',
        taskUserID: '用户ID',
        taskLabel: this.selectedTagsID // 你的任务标签列表
      })
          .then(res => res.data)
          .then(res => {
            if (res.code === 200) {
              console.log(res.data);
              alert("add task successful");

            } else {
              alert("failed to get the data");
            }
          });
    },
  }
};
</script>

<style>
.centered-container {
  background: url('https://wallpapers.com/images/featured/background-design-background-6tgpche84avnjqvz.webp') no-repeat center center fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.content {
  background-color: rgba(255, 255, 255, 0.6); /* 使用rgba()来设置半透明的白色背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.checkbox-container{
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

/* 媒体查询：屏幕宽度小于等于600px时 */
@media (max-width: 600px) {
  .floating-checkbox {
    width: 100%; /* 让 checkbox 在小屏幕上占满宽度 */
  }
}
</style>
