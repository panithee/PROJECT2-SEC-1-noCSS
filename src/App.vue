<script setup>
import Navbar from './components/Navbar.vue'
import DivideCost from './components/DivideCost.vue'
import { ref } from 'vue'
const showLoginOverlay = ref(false);
</script>




<template>
  <Navbar></Navbar>
  <DivideCost/>
</template>
<style scoped></style>


