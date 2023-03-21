<script setup>
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'
import Group from './components/Group.vue';
const showLoginOverlay = ref(false);
</script>




<template>
  <Navbar></Navbar>
  <Group></Group>
</template>
<style scoped></style>


