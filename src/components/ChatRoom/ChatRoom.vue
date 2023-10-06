<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div style="padding: 10px; margin-bottom: 50px">
      <el-row>
        <el-col :span="8">
          <el-card style="width: 100%; min-height: 300px; color: #333; background-color: #ffffff">
            <div v-if="role ==='employer'" style="padding-bottom: 10px; border-bottom: 1px solid #ccc">Tasker List<span style="font-size: 12px"> (Click the chat bubble to start chatting)</span>
            </div>
            <div v-else style="padding-bottom: 10px; border-bottom: 1px solid #ccc">Employer List<span style="font-size: 12px"> (Click the chat bubble to start chatting)</span>
            </div>

            <div style="padding: 10px 0" v-for="user in users" :key="user.email">
              <span :style="{ color: user.isOnline ? 'limegreen' : 'black' }">{{ user.email }}</span>
              <i class="el-icon-chat-dot-round" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                 @click="switchAccount(user.email)"></i>
              <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.email === chatUser">chatting...</span>
              <span v-if="user.isOnline " style="color: limegreen; margin-left: 10px; font-size: 13px">Online</span>
            </div>

          </el-card>
        </el-col>
        <el-col :span="16">
          <div style="width: 800px; margin: 0 auto; background-color: white;
                    border-radius: 5px; box-shadow: 0 0 10px #ccc">
            <div style="text-align: center; line-height: 50px;">
              User:（{{ chatUser }}）
            </div>

            <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc" ref="scrollDiv">
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
            <textarea v-model="text" style="height: 160px; width: 95%; padding: 20px; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none"></textarea>
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
<style>
</style>
