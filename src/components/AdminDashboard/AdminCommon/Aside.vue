<template>
  <el-menu background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           default-active="/Home"
           style="height: 100vh;"
           :collapse="isCollapse"
           :collapse-transition="false"
            router>
    <el-menu-item index="/Home">
      <i class="el-icon-s-home"></i>
      <span slot="title">Main</span>
    </el-menu-item>

    <el-menu-item index="/fun">
      <i class="el-icon-s-home"></i>
      <span slot="title">fun</span>
    </el-menu-item>

    <el-menu-item index="/customer">
      <i class="el-icon-s-home"></i>
      <span slot="title">customer</span>
    </el-menu-item>

    <el-menu-item index="/chatRoom">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">Chat Room</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside.vue",
  data(){
    return {

    }
  },
  props:{
    isCollapse:Boolean
  }
}
</script>

<style scoped>

</style>