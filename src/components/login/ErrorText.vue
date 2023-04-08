<script setup>
import { computed } from "vue";

const props = defineProps({
  errorName: {
    type: String,
    required: true
  }
})
const color = computed(() => {
  if (props.errorName === "ลงทะเบียนสำเร็จ") {
    return "text-green-600"
  }
  return "text-red-600"
})
</script>
<template>
  <span :class="color" class=" label-text-alt">{{ errorName }}</span>
</template>


<style scoped></style>