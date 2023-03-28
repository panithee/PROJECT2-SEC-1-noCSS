<script setup>
import { defineProps, watch,ref } from "vue";
const props=defineProps({
  nameDropDown: String,
  defaultOption: String,
  selectedFn:String,
  dataOption:Array
});
const emit=defineEmits('select')
// watch(props.selectedFn,()=>{
//   select=props.selectedFn
// })
const select = ref()
watch(select ,(newval)=>{
  if(newval!== undefined)
  {
    emit('select',select)
  }
})
</script>

<template>
  <!-- a
  <div>
    <div class="text-md">{{nameDropDown}}</div>
    <select class="text-lg h-12 w-32 border" v-model=select>
      <option value="">{{ defaultOption }}</option>
      <option v-for="(group, index) in dataOption" :key="index">
        {{ group.name }}
      </option>
    </select>
  </div> -->
</template>

<style scoped></style>
