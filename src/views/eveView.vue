<template>
  <div class="eveView">
    <h1>eveView</h1>
    <div>{{ userData }}</div>
    <Group :userData = "userData" @updated="updated"></Group>
  </div>
</template>

<script setup>
import Group from '../components/Group.vue';
defineProps({
  userData: {
    type: Array, default: []
  }
})

const updated = (allGroupArr) => {
    emit("updated", allGroupArr)
}

</script>

<style scoped>

</style>