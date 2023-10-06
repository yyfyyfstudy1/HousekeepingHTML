<template>
  <div class="el-row" style="padding: 5px 0">
    <!-- 当前用户消息 -->
    <div v-if="nowUser">
      <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">
        <div class="tip left" v-popover="'translatePopover'" @contextmenu.prevent="showTranslateMenu($event, text)">
          {{ text }}
        </div>
      </div>
      <div class="el-col el-col-2">
            <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                <img :src="avatarUrl" style="object-fit: cover;">
            </span>
      </div>
      <div v-if="translatedText" class="translated-bubble right-translated"> <!-- 注意这里增加了一个 right-translated 类 -->
        {{ translatedText }}
      </div>
    </div>

    <!-- 远程用户聊天消息 -->
    <div v-else-if="remoteUser">
      <div class="el-col el-col-2" style="text-align: right">
            <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                <img :src="avatarUrl" style="object-fit: cover;">
            </span>
      </div>
      <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">
        <div class="tip right"  v-popover="'translatePopover'" @contextmenu.prevent="showTranslateMenu($event, text)">
          {{ text }}
        </div>
      </div>
      <div v-if="translatedText" class="translated-bubble">
        {{ translatedText }}
      </div>
    </div>

    <el-popover
        ref="translatePopover"
        placement="bottom"
        width="160"
        v-model="translateMenuVisible"
        trigger="manual">

      <el-menu @select="handleTranslate">
        <el-menu-item index="en">英文</el-menu-item>
        <el-menu-item index="zh-CN">中文</el-menu-item>
        <el-menu-item index="fr">法语</el-menu-item>
        <el-menu-item index="ja">日语</el-menu-item>
      </el-menu>
    </el-popover>

  </div>

</template>

<script src="./Bubble.js">
</script>
<style scoped>
.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width: auto;
  display: inline-block !important;
  display: inline;
}

.right-translated {
  float: right;
  margin-right: 80px;
}

.right {
  background-color: deepskyblue;
}

.left {
  background-color: forestgreen;
}


.translated-bubble {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  font-family: sans-serif;
  width: auto;
  display: inline-block !important;
  display: inline;
  color: black;  /* 让翻译的文本为黑色 */
}
</style>