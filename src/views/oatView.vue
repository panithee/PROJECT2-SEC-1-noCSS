<template>
  <div class="oatView">
    <h1>oatView</h1>
    {{ userData }}
  </div>
  <br>
  <br>
  HI
  {{ test }}
</template>

<script setup>
import {defineProps, ref, watch} from 'vue'

const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})
const test = ref(props.userData.value)
watch(() => props.userData, (newVal) => {
  test.value = newVal
})
console.log(props.userData)
</script>

<style scoped></style>