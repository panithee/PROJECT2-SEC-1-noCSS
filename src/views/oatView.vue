<template>
  {{ member }}

  <div v-if="t == false" class="oatView">
    <!-- {{ foodlist}}
    {{ personsWhoEat3 }} -->

    <span class="text-white bg-black">
      กลุ่มโม
    </span>
    <div class="flex justify-between w-40 m-5">
      <span>Black</span>
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
            <li v-for="food in foodlist">
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
  <br>
  <br>
  HI
  {{ test }}
</template>

<script setup>
import {defineProps, ref, watch} from 'vue'

const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})

watch(() => props.userData, (newVal) => {
  test.value = newVal
})

watch(() => props.member, (newVal, oldVal) => {

  member.value = newVal

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


  foodlist.value.push({"foodname": foodName1.value, "foodPrice": foodPrice2.value, "name": personsWhoEat3.value})
  if (tt == false) {
    t.value = !t.value
  }


}

//console.log(foodlist);
</script>

<style scoped></style>