<template>
  <div class="ntView">
    <!-- <h1>ntView</h1>
    {{ userData }} -->
  </div>
  <AvgPerPerson :userData="userData"></AvgPerPerson>
</template>

<script setup>
import AvgPerPerson from '../components/AvgPerPerson.vue';
defineProps({
  userData: {
    type: Array,
    default: []
  }
})
</script>

<style scoped></style>