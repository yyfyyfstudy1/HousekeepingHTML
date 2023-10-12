<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh; background-color: #0D1E48;">
    <Header></Header>
    <div class="payment-success">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">Payment successful</span>
        </div>
        <div class="image-container">
          <img src="../../assets/successful.png" alt="支付成功"/>
        </div>
        <el-alert
            title="Your payment has been completed successfully !"
            type="success"
            :closable="false"
            show-icon>
        </el-alert>
        <div class="next-steps">
          <h2>Next advice</h2>
          <ul>
            <li>Check your email for purchase confirmation.</li>
            <li>View your tasks in "My Tasks".</li>
            <li>Check out our specials you might like !</li>
          </ul>
        </div>
        <el-button type="primary" @click="goToHome" style="margin-top: 20px; margin-left: 25%">Back to your task
          dashboard
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.payment-success {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box-card {
  width: 500px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.image-container img {
  width: 100%;
  max-width: 200px;
}

.next-steps {
  margin-top: 20px;
}

.next-steps ul {
  padding-top: 10px;
  margin-left: 20px;
}

.next-steps li {
  padding-top: 10px;
}
</style>

