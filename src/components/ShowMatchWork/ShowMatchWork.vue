<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div v-if="loading" class="loading-overlay">
      <el-loading :visible="loading" text="Waiting for Job distribution" :full-screen="true">
        <div class="content">
          <img src="../../assets/Gear-0.2s-200px.gif" alt="Loading...">
          <p style="color: #000000; font-weight: bold">Loading for the job distribute...</p>
        </div>
      </el-loading>
    </div>
    <div class="card-container">
      <el-card class="outer-card" shadow="hover" v-for="(item, index) in data" :key="index">
        <h5 class="task-title">{{ item.task.taskTitle }}</h5>
        <div class="inner-card" shadow="hover">
            <p  style="color: white;"><span style="color: #ffda00">Time: </span> {{ item.task.taskBeginTime }}</p>
            <p style="color: white; margin-top: 10px"><span style="color: #ffda00">Address: </span>{{ item.task.taskLocation }}</p>
            <p style="color: white; margin-top: 10px"><span style="color: #ffda00">Salary: </span>$ {{ item.task.taskSalary }}</p>
            <p style="color: white; margin-top: 10px"><span style="color: #ffda00">Estimated Time: </span>{{ item.task.taskEstimatedDuration }} / hour</p>
            <p style="color: white; margin-top: 10px">
              <span style="color: #ffda00">Task detail: </span>{{ truncate(item.task.taskDescribe, 100) }}
            </p>

          <!-- 图片按钮 -->
          <el-button
              style="margin-top: 20px; margin-left: 40px"
              @click="showBigImage(item.task.taskImageUrl)" type="warning">see the task image</el-button>
        </div>
      </el-card>
      <!-- 模态对话框 -->
      <el-dialog :visible.sync="dialogVisible" width="50%" style="background-color: #333333">
        <img :src="bigImageUrl" class="big-image" />
      </el-dialog>
    </div>
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
      loading: false, // 控制加载框和遮罩层的显示
      dialogVisible: false, // 控制模态对话框的显示
      bigImageUrl: '', // 用于存储大图的 URL
    };
  },
  props: {
    resumeForm: {},
    selectedTagsID: Array
  },

  created() {
    const oldTaskData = store.getters.getTaskData;
    console.log(oldTaskData)
    if (oldTaskData.length !== 0) {
      // set the old task data
      this.data = oldTaskData
    } else {
      this.fetchData();
    }

  },

  methods: {
    ...mapActions(['setTaskData']),
    showBigImage(url) {
      this.bigImageUrl = url; // 设置大图的 URL
      this.dialogVisible = true; // 显示模态对话框
    },
    fetchData() {
      // 显示加载框和遮罩层
      this.loading = true;
      // 使用 Axios从服务器获取数据
      // Simulate submitting and receiving taskDescribe and taskImageU
      this.$axios.post(this.$httpurl + '/public/tasks/getDistribute', {
        cv: this.resumeForm.combineText,
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
    truncate(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + '...';
      }
      return text;
    },
    handleButtonClick() {
      // 处理按钮点击事件
      // 可以在这里执行一些逻辑
    }
  }
}

</script>

<style scoped>
.refreshButton {
  margin-top: 10px;
  margin-bottom: 20px;
}

.centered-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  background-color: #0D1E48;
}

.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.outer-card {
  width: 300px;
  height: 400px;
  background-color: #0D1E48;
  border-radius: 10px;
  border: 2px solid #ffda00; /* 设置边框样式 */
  margin: 10px;
}

.inner-card {
  background-color: #0D1E48;
  border-radius: 8px;
  border: 1px solid #ffffff; /* 设置边框样式 */
  padding: 10px;
  text-align: left;
}

.task-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
}

.task-details p {
  margin: 5px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* 大图的样式 */
.big-image {
  max-width: 100%;
  max-height: 100%;
}
</style>