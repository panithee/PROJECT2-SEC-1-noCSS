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
    <DivideFoodCost :userData="userData" :mode="'add'"></DivideFoodCost>
  </div>
</template>


<style scoped>

</style>