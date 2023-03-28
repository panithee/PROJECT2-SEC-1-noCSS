<script setup>
import DivideFoodCost from '../components/DivideFoodCost.vue';
defineProps({
  userData: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <div class="threeView">
    <h1>threeView</h1>
    <DivideFoodCost :userData="userData" :mode="'edit'"></DivideFoodCost>
  </div>
</template>



<style scoped>

</style>