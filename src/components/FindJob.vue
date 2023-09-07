<template>
  <div style="background-color: #0D1E48; height: 100vh">
    <Header></Header>
    <div class="container">
      <h2 style="text-align: center; margin-top: 50px; color: white">Get your part-time job</h2>
      <el-input
          v-model="inputText"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="enter with your CV, tell me what are you good at"
          style="margin-top: 20px"
      ></el-input>

      <el-checkbox-group v-model="selectedTags">
        <el-checkbox v-for="tag in tags" :label="tag" :key="tag.tagId">{{ tag.tagName }}</el-checkbox>
      </el-checkbox-group>
      <div v-if="selectedTags.length > 0" class="selected-tags">
        <p>已选标签：</p>
        <span class="tag" v-for="(tag, index) in selectedTags" :key="index">{{ tag.tagName }}</span>
      </div>


      <el-button @click="handleSubmit" type="primary" style="margin-top: 20px">提交</el-button>

      <div class="reply-box" v-if="showReply" >
        <h3>回复内容：</h3>
        <p>{{ replyText }}</p>

        <!-- Display taskDescribe and taskImageU -->
        <div class="task-details">
          <h3>任务详情：</h3>
          <p>{{ taskDescribe }}</p>
          <img :src="taskImageUrl" alt="Task Image" v-if="taskImageUrl" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "./Header.vue"
export default {
  components: { Header},
  data() {
    return {
      inputText: "",
      showReply: false,
      replyText: "",
      taskDescribe: "", // Add taskDescribe data
      taskImageUrl: "",   // Add taskImageU data
      tags: [],
      selectedTags: [],
      icon:'el-icon-s-fold',
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
    handleSubmit() {

      // 使用 this.$router.push 进行路由导航，传递参数通过 query
      this.$router.push({
        name: "showMatchWork", // 下一页的路由路径
        params: {
          inputText: this.inputText,
          selectedTagsID: this.selectedTagsID
        }
      });

      this.showReply = true;
    }
  }
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
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
