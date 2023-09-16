<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="width: 70%; margin: 40px auto 0;">
      <el-steps :active="active" finish-status="success" class="custom-steps">
        <el-step title="Employer is confirm"></el-step>
        <el-step title="Labor is arrived"></el-step>
        <el-step title="Task have finished"></el-step>
        <el-step title="Payment successful"></el-step>
      </el-steps>
      <div>
<!--        <el-button @click="changeStatus(1)">商家已接单</el-button>-->
<!--        <el-button @click="changeStatus(2)">骑手赶往商家</el-button>-->
<!--        <el-button @click="changeStatus(3)">骑手在送货</el-button>-->
<!--        <el-button @click="changeStatus(4)">骑手已送达</el-button>-->
      </div>
      <transition name="fade" mode="out-in">
        <div :key="active">
          <div v-if="active === 1">
            商家已经接到你的订单，正在准备食物。
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

<script>
import Header from "../../Header.vue"
import store from '../../../store';
let socket;
export default {
  components: {
    Header,
  },

  mounted() {
    const id = this.$route.query.id;
    this.taskId = id;
    console.log("接收到的 id 参数为：", id);

    // 开始接收后端传递的消息
    this.initWebsocket();

  },
  data() {
    return {
      taskId:null,
      active: 0,  // 当前的状态
    };
  },
  methods: {
    changeStatus(status) {
      this.active = status;
    },
    initWebsocket(){
      this.user = store.getters.getUserInfo;
      let userId = this.user.id;
      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        console.log(userId)
        let socketUrl = "ws://localhost:8082/notification/" + userId;
        if (socket != null) {
          socket.close();
          socket = null;
        }
        // 开启一个websocket服务
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
          console.log("websocket已打开");
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        // 使用箭头函数，让 this能访问到外部函数的作用域
        socket.onmessage = (msg) => {
          console.log("收到数据====" + msg.data)
          const JsonMessage = JSON.parse(msg.data)
          if (JsonMessage.status === "ok" && JsonMessage.taskId === this.taskId) {
            this.isLoading = false;
            this.$router.push({
              path: '/taskStatusHandler/employer',
              query: { id: this.taskId }
            });

          }
        };

        //关闭事件
        socket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function () {
          console.log("websocket发生了错误");
        }
      }
    },
  },
};
</script>

<style>

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
</style>
