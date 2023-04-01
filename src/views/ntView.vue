<template>
  <div class="ntView">
    <h1>ntView</h1>
    {{ userData[0].name }}
  </div>
</template>

<script setup>
const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})

console.log('ntView', props.userData)
</script>

<style scoped></style>