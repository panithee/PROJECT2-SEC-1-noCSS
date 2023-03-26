<template>
  <div class="ntView">
    <h1>ntView</h1>
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