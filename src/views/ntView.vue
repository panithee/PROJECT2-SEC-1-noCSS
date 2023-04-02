<template>
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

defineEmits(['updated'])
console.log('ntView', props.userData)
</script>

<style scoped></style>