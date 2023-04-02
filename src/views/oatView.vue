<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import DivideFoodCost from '../components/DivideFoodCost.vue';

const props = defineProps({
  mealData: {
    type: Object,
    default: {}
  },
  member: {
    type: Array,
    default: []
  }
})
const foodChoose = ref({ data: {}, index: -1 });
const selectMode = ref('add')
const switchFood = ref(false)
const clickEdit = (food, index) => {
  foodChoose.value.data = food
  foodChoose.value.index = index

  selectMode.value = 'edit'
  switchFood.value = true
}
const clickAdd = () => {
  foodChoose.value.data = {}
  foodChoose.value.index = -1
  selectMode.value = 'add'
  switchFood.value = true
}
watch(() => props.mealData, (newVal, oldVal) => {
  console.log(newVal)
  mealname.value = newVal.name
  console.log(mealname.value)
  foodlist.value = newVal.foods
  console.log(foodlist.value)

})

const show = () => {
  if (switchFood.value == false) {
    switchFood.value = !switchFood.value
  }
}
const saveFood = (food) => {
  if (selectMode.value == 'add') {
    foodlist.value.push(food)
  } else {
    foodlist.value[foodChoose.value.index] = food
  }
  console.log(foodlist.value)
  switchFood.value = !switchFood.value
}

const foodlist = ref([])
const mealname = ref('')


</script>

<template>
  <div v-if="switchFood == false" class="oatView">
    <!-- {{ foodlist}}
                                                                                                              {{ personsWhoEat3 }} -->
    <div class="flex justify-between w-40 m-5">
      <span @click="$emit('back')">Back</span>
      <span>มื้ออาหาร</span>
    </div>
    <div class=" ml-[110px]">
      <input v-model="mealname" class="border border-b-black text-[25px]" placeholder="Meal name" type="text">
    </div>

    <div class="container m-auto ">
      <div class="flex flex-col  h-[60vh]">
        <div v-if="foodlist?.length <= 0">

        </div>
        <div v-else class="w-full ">
          <ul>
            <!-- {{ foodlist }} -->
            <br>
            <br>
            <li v-for="(food, index) in foodlist">
              {{ food }}
              <div class="h-[100px] ">
                <div>
                  <span class="text-[25px]">{{ food.name }}</span>
                  <span class="text-[25px] float-right">{{ food.price }}</span>
                  <br>
                  <span v-for="(consumer, index) in food.consumers" :id="index" :key="index"
                    class="px-2 mx-2 text-black bg-white border border-black rounded-lg hover:bg-gray-200">
                    {{ consumer?.name }}
                  </span>
                </div>
                <hr>
                <div class="flex flex-row ">

                  <button @click="clickEdit(food, index)"> edit</button>

                </div>

              </div>

            </li>
          </ul>

        </div>

      </div>
      <button class="fixed bottom-0 right-0" @click="clickAdd"><img alt="" src="../assets/img/add-icon.png"></button>
    </div>


  </div>

  <DivideFoodCost v-if="switchFood == true" :foods="foodChoose.data" :member="member" :mode="selectMode"
    @back="switchFood = false" @save="saveFood" />
  <button @click="$emit('updatedMeals', foodlist, mealname)">save</button>
</template>


<style scoped></style>