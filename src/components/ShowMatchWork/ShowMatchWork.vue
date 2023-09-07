<template>
  <div style="background-color: #0D1E48; height: 100vh">
    <Header></Header>
    <!-- 使用 v-if 控制加载框和遮罩层的显示 -->
    <div v-if="loading" class="loading-overlay">
      <el-loading :visible="loading" text="Waiting for Job distribution" :full-screen="true">
        <!-- 页面内容 -->
        <div class="content">
          <!-- 数据内容 -->
          <img src="../../assets/Gear-0.2s-200px.gif" alt="Loading...">
          <p style="color: #000000; font-weight: bold">Loading for the job distribute...</p>
        </div>

      </el-loading>
    </div>
    <div class="card-container">
      <!-- 使用 v-for 循环渲染卡片 -->
      <el-card class="card" shadow="hover" v-for="(item, index) in data" :key="index">
        <div class="card-content">
          <img :src="item.task.taskImageUrl" :alt="'Image ' + (index + 1)">
          <h3>{{ item.task.similarity }}</h3>
          <p>{{ item.task.taskDescribe }}</p>
          <p>{{ item.gptReply }}</p>
        </div>
      </el-card>
    </div>

    <!-- 按钮 -->
    <!-- 包裹按钮的 div -->
    <div class="centered-button">
      <el-button type="primary" @click="handleButtonClick" class="refreshButton">Refresh task</el-button>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";
import store from '../../store';
import {mapActions} from "vuex"; // 导入Vuex store
export default {
  name: "ShowMatchWork",
  components: {Header},

  data() {
    return {
      data: [], // 用于存储从服务器获取的数据数组
      loading: false // 控制加载框和遮罩层的显示
    };
  },
  props: {
    inputText: String,
    selectedTagsID: Array
  },
  created() {
    const oldTaskData = store.getters.getTaskData;
    console.log(oldTaskData)
    if (oldTaskData.length !== 0){
      // set the old task data
      this.data = oldTaskData
    }else {
      this.fetchData();
    }

  },

  methods: {
    ...mapActions(['setTaskData']),
    fetchData() {
      // 显示加载框和遮罩层
      this.loading = true;
      // 使用 Axios从服务器获取数据
      // Simulate submitting and receiving taskDescribe and taskImageU
      let inputText = this.inputText;
      this.$axios.post(this.$httpurl + '/public/tasks/getDistribute', {
        cv: inputText,
        tags: this.selectedTagsID
      })
          .then(res => res.data)
          .then(res => {
            // 隐藏加载框和遮罩层
            this.loading = false;

            if (res.code === 200) {
              this.data = res.data;
              // save the task data to the VueX
              this.setTaskData({taskData: this.data})
            } else {
              alert("failed to get the data");
            }
          });
    },
    handleButtonClick() {
      // 处理按钮点击事件
      // 可以在这里执行一些逻辑
    }
  }
}

</script>

<style scoped>
/* 包裹按钮的 div 样式 */

.refreshButton{
  margin-top: 20px;
  margin-bottom: 20px;
}
.centered-button {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 50px; /* 可以根据需要调整按钮与内容的间距 */
  background-color: #0D1E48;
}

.card-container {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}

.card {
  width: 300px;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.card img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.card-content h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

/* 遮罩层样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 半透明黑色遮罩层 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 确保遮罩层在最上层 */
}
</style>