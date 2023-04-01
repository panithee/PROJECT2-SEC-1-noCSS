<template>
  {{ mealData }}
  <div v-if="t == false" class="oatView">
    <!-- {{ foodlist}}
    {{ personsWhoEat3 }} -->

    <span class="bg-black text-white">
        กลุ่มโม
     </span>
    <div class="flex justify-between  w-40 m-5">
      <span>Black</span>
      <span>มื้ออาหาร</span>
    </div>
    <div class=" ml-[110px]">
      <input v-model="mealname" class="border border-b-black text-[25px]" placeholder="Meal name" type="text">
    </div>

    <div class="container m-auto ">
      <div class="flex flex-col  h-[60vh]">
        <div v-if="foodlist?.length <= 0">
          <input class="border border-black text-[40px] rounded-full" placeholder="Add ur food ~~" type="text">
        </div>
        <div v-else class=" w-full">
          <ul>
            <li v-for="food in foodlist">
              <div class="h-[100px] ">
                <div>
                  <span class="text-[25px]">{{ food.name }}</span>
                  <span class="text-[25px] float-right">{{ food.price }}</span>
                  <br>
                  <span v-for="(consumer, index) in food.consumers" :id="index"
                        :key="index"
                        class="px-2 mx-2 border border-black rounded-lg bg-white hover:bg-gray-200  border-black text-black">
                    {{ consumer?.name }}
                  </span>
                </div>
                <hr>
                <div class="flex flex-row ">

                  <button @click="clickEdit(food)"> edit</button>

                </div>

              </div>

            </li>
          </ul>

        </div>

      </div>
      <button class="float-right" @click="clickAdd"><img alt="" src="../assets/img/add-icon.png"></button>
    </div>


  </div>

  <DivideFoodCost v-if="t == true" :food="foodEdit" :member="member" :mode="selectMode" @sendAllData="test"/>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from 'vue'
import DivideFoodCost from '../components/DivideFoodCost.vue';

const props = defineProps({
  userData: {
    type: Array,
    default: []
  },
  mealData: {
    type: Object,
    default: {}
  },
  member: {
    type: Array,
    default: []
  }
})
const foodEdit = ref({})
const selectMode = ref('add')
const t = ref(false)
const clickEdit = (food) => {
  foodEdit.value = {food}
  selectMode.value = 'edit'
  t.value = true
}
const clickAdd = () => {
  foodEdit.value = {}
  selectMode.value = 'add'
  t.value = true
}
watch(() => props.mealData, (newVal, oldVal) => {
  console.log(newVal)
  mealname.value = newVal.name
  console.log(mealname.value)
  foodlist.value = newVal.foods
  console.log(foodlist.value)

})
const show = () => {
  if (t.value == false) {
    t.value = !t.value
  }
}

const foodlist = ref([])
const mealname = ref('')
const foodName1 = ref('')
const foodPrice2 = ref()
const personsWhoEat3 = ref([])
const member = ref([])
const test = (foodName, foodPrice, personsWhoEat, tt) => {
  foodName1.value = foodName
  foodPrice2.value = foodPrice
  personsWhoEat3.value = personsWhoEat

  // console.log(personsWhoEat3.value[0].name)
  // member = personsWhoEat3.value[0].name

  // console.log(  Array.from(personsWhoEat));
  foodlist.value.push({"foodname": foodName1.value, "foodPrice": foodPrice2.value, "oc": personsWhoEat3.value})
  if (tt == false) {
    t.value = !t.value
  }


}

//console.log(foodlist);
</script>

<style scoped></style>