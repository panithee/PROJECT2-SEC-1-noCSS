<script setup>
import { defineProps } from 'vue';
defineProps ({
  category : String,
  type : String,
  dataList : Array
})
</script>
 
<template>
      <!-- <div>
        <div class="text-md">{{ category }}</div>
        <select class="w-32 h-12 text-lg border" v-model="type">
          <option value="">all</option>
          <option v-for="(group, index) in dataList" :key="index">
            {{ group.name }}
          </option>
        </select>
      </div> -->
</template>
 
<style scoped>

</style>