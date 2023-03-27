<script setup>
import { defineProps } from "vue";
defineProps({
  nameDropDown: String,
  defaultOption: String,
  selectedFn:String,
  dataOption:Array
});
const selectedFnType = {
  group:"selectedGroup",
  meal:"selectedMeal",
  member:"selectedMember",
}

</script>

<template>
  <div>
    <div class="text-md">{{nameDropDown}}</div>
    <select class="text-lg h-12 w-32 border" v-model=selectedFn>
      <option value="">{{ defaultOption }}</option>
      <option v-for="(group, index) in dataOption" :key="index">
        {{ group.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
