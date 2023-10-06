<template>
  <div class="el-row" style="padding: 5px 0">
    <!-- 当前用户消息 -->
    <div v-if="nowUser">
      <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">
        <div class="tip left" @contextmenu.prevent="showTranslateMenu($event, text)">
          {{ text }}
        </div>
      </div>
      <div class="el-col el-col-2">
            <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                <img :src="avatarUrl" style="object-fit: cover;">
            </span>
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
        <div class="tip right" @contextmenu.prevent="showTranslateMenu($event, text)">
          {{ text }}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['nowUser', 'remoteUser', 'text', 'avatarUrl'],
  methods: {
    showTranslateMenu(event) {
      // 在这里执行翻译逻辑
    }
  }
}
</script>
