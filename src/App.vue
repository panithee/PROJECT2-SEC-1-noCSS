<script setup>
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'
import AvgPerPerson from './components/AvgPerPerson.vue';
const showLoginOverlay = ref(false);
</script>




<template>
  <Navbar></Navbar>
  <AvgPerPerson />

</template>
<style scoped></style>


