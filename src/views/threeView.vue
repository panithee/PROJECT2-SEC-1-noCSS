

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import DivideFoodCost from '../components/DivideFoodCost.vue';
const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})
onMounted(() => {
  console.log(props.userData.value)
})
console.log(props.userData.value)
const foodlist = ref([])
const mealname = ref('')
const foodName1 = ref('')
const foodPrice2 = ref()
const personsWhoEat3 = ref([])
const test = (foodName, foodPrice, personsWhoEat) => {
    foodName1.value = foodName
    foodPrice2.value = foodPrice
    personsWhoEat3.value = personsWhoEat

      // console.log(personsWhoEat3.value[0].name)
      
      foodlist.value.push({"foodname":foodName1.value,"foodPrice":foodPrice2.value,"name":personsWhoEat3.value})
     
}

test()
//console.log(foodlist);
</script>

<template>
  <div class="threeView">
    <h1>threeView</h1>
    
  <DivideFoodCost :userData="userData" @sendAllData="test" :mode="'add'" />
  </div>
</template>



<style scoped>

</style>