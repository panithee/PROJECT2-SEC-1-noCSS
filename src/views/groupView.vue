<template>
  <div class="eveView">
    <Group :userData="userData" @updated="updated"></Group>
  </div>
</template>

<script setup>
import Group from '../components/Group.vue';

defineProps({
  userData: {
    type: Array, default: []
  }
})
const emit = defineEmits(['updated'])
const updated = (allGroupArr) => {
  emit("updated", allGroupArr)
}

</script>

<style scoped></style>