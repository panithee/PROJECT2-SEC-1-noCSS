<template>
  <div class="oatView">
    <h1>oatView</h1>
    <!-- {{ userData }} -->
  </div>

  <DivideFoodCost :userData="userData" @sendAllData="test" :mode="'add'"/>
</template>

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

const foodName1 = ref('')
const foodPrice2 = ref()
const personsWhoEat3 = ref()
const test = (foodName, foodPrice, personsWhoEat) => {
    foodName1.value = foodName
    foodPrice2.value = foodPrice
      personsWhoEat3.value = personsWhoEat
      console.log(foodName1)
      console.log(foodPrice2)
      console.log(personsWhoEat3)
}
</script>

<style scoped></style>