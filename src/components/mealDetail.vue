<script setup>
import {defineProps, ref, watch} from 'vue'
import DivideFoodCost from './DivideFoodCost.vue';

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
const foodChoose = ref({data: {}, index: -1});
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
watch(() => props.mealData, (newVal) => {
  console.log(newVal)
  mealname.value = newVal.name
  console.log(mealname.value)
  foodlist.value = newVal.foods
  console.log(foodlist.value)

})

const saveFood = (food) => {

  if (selectMode.value === 'add') {
    if (foodlist.value.some((e => e.name === food.name))) {
      alert("มีชื่อรายการนี้อยู่แล้ว")
      return
    }
    foodlist.value.push(food)
  } else {
    foodlist.value[foodChoose.value.index] = food
  }
  console.log(foodlist.value)
  switchFood.value = !switchFood.value
}

const foodlist = ref([])
const mealname = ref('')
const emit = defineEmits(['back', 'updatedMeals'])
const deleteMeal = (index) => {
  if (confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) {
    foodlist.value.splice(index, 1)

  }
}
const isMealNameValid = ref(false)
const beforeSave = () => {
  if (mealname.value === '') {
    isMealNameValid.value = true
  } else {
    isMealNameValid.value = false
    emit('updatedMeals', foodlist.value, mealname.value)
    foodlist.value = []
    mealname.value = ""
  }
}
</script>

<template>
  <div v-if="switchFood === false" class="oatView">
    <!-- {{ foodlist}}
                                                                                                                                                                        {{ personsWhoEat3 }} -->
    <div class="flex items-center w-1/2 m-5">
      <span @click="$emit('back')" class="flex hover:bg-white hover:rounded-xl cursor-pointer p-1 text-xl font-semibold w-fit">ย้อนกลับ</span>
      <span class="ml-10 text-xl font-semibold flex items-center">มื้ออาหาร</span>
    </div>
    <div class="flex items-center ml-[150px]">
      <input v-model="mealname" class="border border-b-black text-[25px]" placeholder="ชื่อมื้ออาหาร" type="text">
      <span v-show="isMealNameValid" class="flex ml-2 justify-center font-bold text-red-500 text-md">*จำเป็น</span>
    </div>

    <div class="container m-auto ">
      <div class="flex flex-col  h-[60vh]">
        <div v-if="foodlist?.length <= 0">

        </div>
        <div v-else class="w-full ">
          <ul>
            <br>
            <br>
            <div class="h-36" v-for="(food, index) in foodlist">
              <div class="h-[100px] ">
                <div>
                  <span class="text-[25px]">{{ food.name }}</span>
                  <span class="text-[25px] float-right">{{ food.price }}</span>
                  <br>
                  <span v-for="(consumer, index) in food.consumers" :id="index" :key="index"
                        class="px-2 mx-2 text-black bg-white border border-black rounded-lg">
                    {{ consumer?.name }}
                  </span>
                </div>
                <hr>
                <div class="flex flex-row ">
                  <button class="border border-black m-[20px] rounded-lg p-1 text-green-800 hover:bg-black hover:text-green-300" @click="clickEdit(food, index)">แก้ไขอาหาร</button>
                  <button @click="deleteMeal(index)" class="text-red-600 border-red-600 p-1 rounded-lg border hover:bg-white h-fit mt-5 ">ลบอาหาร</button>
                </div>

              </div>

            </div>
          </ul>

        </div>

      </div>
      <div class="flex justify-end">
        <button class="flex flex-col mx-auto justify-center bottom-0 right-0" @click="clickAdd"><img class="flex mx-auto" alt="" src="../assets/img/add-icon.png">
          <span class="flex text-center">คลิ๊กเพิ่อเพิ่มอาหาร</span>
        </button>
        <button @click="beforeSave" class="bg-white rounded-lg p-2 text-xl hover:bg-cyan-700 hover:text-white h-20">บันทึกข้อมูล</button>
      </div>

    </div>

    
  </div>

  <DivideFoodCost v-if="switchFood === true" :foods="foodChoose.data" :member="member" :mode="selectMode"
                  @back="switchFood = false" @save="saveFood"/>

</template>


<style scoped>

</style>
