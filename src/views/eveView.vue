<template>
  <div class="eveView">
    <h1>eveView</h1>
    <div>{{ userData }}</div>
    <Group :userData = "userData"></Group>
  </div>
</template>

<script setup>
import Group from '../components/Group.vue';
defineProps({
  userData: {
    type: Array, default: []
  }
})
</script>

<style scoped>

</style>