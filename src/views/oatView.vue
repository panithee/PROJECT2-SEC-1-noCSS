<template>
  <div class="oatView">
    <h1>oatView</h1>
    {{ userData }}
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})
onMounted(() => {
  console.log(props.userData.value)
})
console.log(props.userData.value)
</script>

<style scoped></style>