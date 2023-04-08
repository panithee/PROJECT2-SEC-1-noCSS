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
    return "green"
  }
  return "red"
})
</script>
<template>
  <span :class="`text-${color}-600`" class=" label-text-alt">{{ errorName }}</span>
</template>


<style scoped></style>