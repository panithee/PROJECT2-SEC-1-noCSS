<template>
  <div class="eveView">
    <h1>eveView</h1>
    {{ userData }}
  </div>
</template>

<script setup>
defineProps({
  userData: {
    type: Array, default: []
  }
})
</script>

<style scoped>

</style>