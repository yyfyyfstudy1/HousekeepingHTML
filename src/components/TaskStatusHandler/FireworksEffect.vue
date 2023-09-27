<template>
  <div ref="fireworksContainer" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
// 尝试直接从库的根目录导入，而不是从`dist`目录
import { Fireworks } from 'fireworks-js';
export default {
  name: 'FireworksEffect',
  mounted() {
    const options = {
      maxRockets: 4,            // max # of rockets to spawn
      rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
    };
    const fireworks = new Fireworks(this.$refs.fireworksContainer, options);
    fireworks.start();
  },
  beforeDestroy() {
    // Don't forget to clean up to avoid memory leaks
    // fireworks.stop(); // Assuming fireworks is stored as a component instance property
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
