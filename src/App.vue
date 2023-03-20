<script setup>
import Navbar from './components/Navbar.vue'
import DivideFoodCost from './components/DivideFoodCost.vue'
import { ref } from 'vue'
const showLoginOverlay = ref(false);
</script>




<template>
  <Navbar></Navbar>
  <DivideFoodCost/>
</template>
<style scoped></style>


