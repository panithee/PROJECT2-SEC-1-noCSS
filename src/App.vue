<script setup>
import Navbar from './components/Navbar.vue'
import LoginOverlay from './components/LoginOverlay.vue'
import { ref } from 'vue'
const showLoginOverlay = ref(false);
const loginToggle = () => {
  showLoginOverlay.value = !showLoginOverlay.value;
}
</script>




<template>
  <Navbar></Navbar>
  <div>
    <login-overlay v-if="showLoginOverlay" @close="showLoginOverlay = false" />
  </div>
</template>
<style scoped></style>


