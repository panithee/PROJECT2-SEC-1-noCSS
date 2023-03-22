<template>
  <div class="oatView">
    <h1>oatView</h1>
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