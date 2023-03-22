<template>
  <div class="threeView">
    <h1>threeView</h1>
    {{ userData }}
  </div>
</template>

<script setup>
defineProps({
  userData: {
    type: Array,
    default: []
  }
})
</script>

<style scoped>

</style>