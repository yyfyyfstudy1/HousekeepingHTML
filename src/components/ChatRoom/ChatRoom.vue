<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="padding: 10px; margin-bottom: 50px; margin-top: 20px">
      <el-row>
        <el-col :span="8">
          <el-card style="width: 100%; min-height: 300px; background-color: #0D1E48">
            <div v-if="role ==='employer'" style="padding-bottom: 10px; border-bottom: 1px solid #ffffff; color: antiquewhite">Tasker List<span style="font-size: 12px"> (Click the chat bubble to start chatting)</span>
            </div>
            <div v-else style="padding-bottom: 10px; border-bottom: 1px solid #ffffff; color: antiquewhite ">Employer List<span style="font-size: 12px"> (Click the chat bubble to start chatting)</span>
            </div>

            <div style="padding: 10px 0" v-for="user in users" :key="user.id">
              <span :style="{ color: user.isOnline ? 'limegreen' : 'antiquewhite'}">{{ user.email }}</span>
              <i class="el-icon-chat-dot-round" style="margin-left: 10px;color: antiquewhite; font-size: 16px; cursor: pointer"
                 @click="switchAccount(user.email)"></i>
              <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.email === chatUser">chatting...</span>
              <span v-if="user.isOnline " style="color: limegreen; margin-left: 10px; font-size: 13px">Online</span>
            </div>

          </el-card>
        </el-col>
        <el-col :span="16">
          <div style="width: 800px; margin: 0 auto; background-color: #0D1E48;
                    border-radius: 5px; ">
            <div style="text-align: center; line-height: 50px;border: 1px solid #ffffff; color: antiquewhite">
              User:（{{ chatUser }}）
            </div>

            <div style="height: 350px; overflow:auto;border: 1px solid #ffffff; background-color: #0D1E48" class="scrollDiv" ref="scrollDiv">
              <chat-bubble
                  v-for="message in messages"
                  :key="message.id"
                  :nowUser="message.isNowUser"
                  :remoteUser="!message.isNowUser"
                  :text="message.text"
                  :avatarUrl="message.avatarUrl"
              ></chat-bubble>

            </div>

            <div style="height: 200px">
            <textarea v-model="text" style="height: 160px; width: 95%; padding: 20px; border: 1px solid #ffffff; color: #ffffff; background-color: #0D1E48 "></textarea>
              <div style="text-align: right; padding-right: 10px">
                <el-button type="primary" size="mini" @click="send">Send Message</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script src="./ChatRoom.js">

</script>
<style scoped>
.scrollDiv {
  /* 其他样式... */
  overflow-y: scroll; /* 垂直滚动 */
}

.scrollDiv::-webkit-scrollbar {
  width: 4px; /* 设置滚动条的宽度为4px */
  background-color: #0D1E48; /* 设置滚动条背景颜色与div背景颜色相同 */
}

.scrollDiv::-webkit-scrollbar-thumb {
  background-color: #ffffff; /* 滚动条滑块的颜色 */
  border-radius: 2px; /* 滚动条滑块的圆角 */
}

/* 如果需要，可以添加一个hover效果 */
.scrollDiv::-webkit-scrollbar-thumb:hover {
  background-color: #bbbbbb; /* 滚动条滑块hover时的颜色 */
}

</style>
