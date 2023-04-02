<template>
  <div class="ntView"> </div>
  <h1>ntView</h1>
  <AvgPerPersonVue :userData="userData"></AvgPerPersonVue>
</template>

<script setup>
import AvgPerPersonVue from '../components/AvgPerPerson.vue'
const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})

console.log('ntView', props.userData)
</script>

<style scoped></style>