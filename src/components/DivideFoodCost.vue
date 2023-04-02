<script setup>
import { ref, computed, watchEffect, onMounted } from "vue"
const props = defineProps({
  mode: {
    type: String,
    default: "add"
  },
  member: {
    type: Array
  },
  foods: {
    type: Object
  }
})
const emit = defineEmits(['sendAllData'])
const page = ref(true);
const switchMenu = (type) => {
  page.value = type === "equal";
  if (!page.value) calculatePriceByPercent();
};
let food = ref({});
const foodName = ref('')
const foodPrice = ref(undefined)
const personsWhoEat = ref([])
const personsList = ref([])
const isFoodNameValid = ref(false);
const isFoodPriceValid = ref(false);
const isPersonsWhoEatValid = ref(false);
const calculatePriceByPercent = () => {
  if (personsWhoEat.value?.length === undefined) return;
  personsWhoEat.value.map((person) => {
    if (foodPrice.value === undefined) {
      person.price = 0;
      return person
    }
    console.log(person.percentage)
    person.price = parseFloat((foodPrice.value * Number(person.percentage)) / 100).toFixed(2)
    return person;
  })
}
watchEffect(() => {
  if (props.mode === 'edit') {
    if (props.foods === undefined) return;
    food.value = props.foods;
    personsWhoEat.value = props.foods.consumers;
    page.value = props.foods.splitMode === "equal";
    console.log(food.value);
    foodName.value = food.value.name
    foodPrice.value = food.value.price
  }
  personsList.value = props.member;
  console.log(personsList.value)
}
);
const togglePersonWhoEat = (event) => {
  const index = event.target.id;
  if (!checkPersonEating(personsList.value[index].id)) {
    personsWhoEat.value.push({
      "id": personsList.value[index].id,
      "name": personsList.value[index].name,
      "percentage": 0,
      "price": 0
    })
    personsWhoEat.value.sort((a, b) => a.id - b.id)
  }
  else {
    personsWhoEat.value = personsWhoEat.value.filter((person) => person.id !== personsList.value[index].id)
  }
}
const avgPricePerPerson = computed(() => {
  if (isNaN(foodPrice.value) || foodPrice.value < 0) {
    foodPrice.value = 0
    const avg = (Math.ceil(foodPrice.value / personsWhoEat.value.length * 100) / 100).toFixed(2)
    personsWhoEat.value = personsWhoEat.value.map((a) => {
      a.price = avg;
      return a
    })
  }
  return (Math.ceil(foodPrice.value / personsWhoEat.value.length * 100) / 100).toFixed(2)
});
const inputPercent = (event, index) => {
  const percentage = event.target.value;
  personsWhoEat.value[index].percentage = percentage > 100 || percentage < 0 ? 0 : percentage;
  calculatePriceByPercent();
};
const calculateTotalPercent = () => {
  if (personsWhoEat.value?.length === undefined) return 0;
  let totalPercent = personsWhoEat.value.reduce((totalPercent, currentPercent) => {
    return totalPercent + Number(currentPercent.percentage)
  }, 0)
  return totalPercent
}
const checkPercent = () => {
  const totalPercent = calculateTotalPercent()
  if (totalPercent <= 100) {
    return `ขาดอีก : ${100 - totalPercent}%`
  } else if (totalPercent > 100) {
    return `เกินมา : ${totalPercent - 100}%`
  }
}
const checkPersonEating = (id) => personsWhoEat.value?.some((person) => person.id === id);
const checkFoodPrice = () => {
  if (foodPrice.value < 0) {
    foodPrice.value = 0
  }
}
const checkDataBeforeDone = () => {
  if (foodName.value.trim() === "") {
    isFoodNameValid.value = true
  } else {
    isFoodNameValid.value = false
  }
  if (foodPrice.value === undefined || foodPrice.value <= 0) {
    isFoodPriceValid.value = true
  } else {
    isFoodPriceValid.value = false
  }
  if (personsWhoEat.value.length < 1) {
    isPersonsWhoEatValid.value = true
  } else {
    isPersonsWhoEatValid.value = false
  }
  if (foodName.value.trim() !== "" && foodPrice.value !== undefined && foodPrice.value > 0 && personsWhoEat.value.length >= 1) {
    return emit('sendAllData', foodName.value, foodPrice.value, personsWhoEat.value);
  }
}
</script>
<template>
  <br>
  <br>
  <p>{{ foods }}</p>
  <br>
  <br>
  <p>{{ member }}</p>
  <br>
  <br>
  <p>{{ personsWhoEat }}</p>
  <br>
  <br>
  <p>{{ foodPrice }}</p>
  <div class="w-full h-full">
    <router-link to="/"
      class="flex px-2 ml-10 text-3xl hover:bg-gray-200 hover:text-black hover:rounded-lg w-fit backfont">กลับ</router-link>
    <input type="text" placeholder="กรุณาใส่ชื่ออาหาร" v-model="foodName"
      class="flex justify-center mx-auto text-2xl text-center border rounded-lg">
    <p v-show="isFoodNameValid" class="flex justify-center font-bold text-red-500 text-md">*จำเป็น</p>
    <p class="flex justify-center mt-3 text-lg text-gray-600">เลือกโหมดการหาร</p>
    <div class="flex justify-center">
      <img src="../assets/AkarIconsEqual.svg" class="mr-2 cursor-pointer" @click="switchMenu('equal')"
        :class="page === true ? 'opacity-100' : 'opacity-10'" alt="" />
      <img src="../assets/MdiPercentCircleOutline.svg" class="cursor-pointer" @click="switchMenu('percentage')"
        :class="page === false ? 'opacity-100' : 'opacity-10'" alt="" />
    </div>
    <p class="flex justify-center mt-3 text-lg text-gray-600">รายชื่อคนทั้งหมดในกลุ่ม</p>
    <p v-show="isPersonsWhoEatValid" class="flex justify-center font-bold text-red-500 text-md">*จำเป็น</p>
    <div class="flex justify-between w-64 pb-2 mx-auto mt-2 overflow-x-scroll bg-white">
      <button class="px-2 mx-2 border border-black rounded-lg" v-for="(person, index) in personsList" :key="index"
        :id="index" @click="togglePersonWhoEat($event)" :class="
          checkPersonEating(person.id)
            ? 'bg-white hover:bg-gray-200  border-black text-black'
            : 'bg-white hover:bg-gray-200 hover:text-black border-gray-200 text-gray-300'">
        {{ person?.name }}
      </button>
    </div>
    <div class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96 m-height m-table" v-if="page">
      <table class="w-full mx-auto mt-4">
        <thead>

          <tr>
            <th class="text-left">คนจ่าย</th>
            <th class="text-right">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in personsWhoEat" :key="index" class="border-b border-gray-300">
            <td class="text-xl text-left">{{ person?.name }}</td>
            <td class="text-xl text-end">{{ avgPricePerPerson }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96 m-table" v-if="!page">
      <table class="w-full mx-auto mt-4">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <img src="../assets/MaterialSymbolsPercentSharp.svg" class="mx-auto" alt="" />
            <th class="text-end">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300" v-for="(person, index) in personsWhoEat" :key="index">
            <td class="text-xl text-left">{{ person.name }}</td>
            <td class="text-center">
              <input type="number" placeholder="'0-100'" @input="inputPercent($event, index)" min="0" max="100"
                class="w-20 text-center bg-gray-200" v-model="person.percentage" />
            </td>
            <td class="text-xl text-end">{{ person.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-3/5 mx-auto mt-10 ">
      <div class="flex flex-col w-full percenttext">
        <p v-if="!page" class="flex flex-col">
          เปอร์เซ็นต์ : {{ calculateTotalPercent() }}%
        </p>
        <p v-if="!page" class="flex flex-col">{{ checkPercent() }}</p>
      </div>
      <div class="flex items-center justify-end w-full boxfoodprice">
        <p class="flex items-center mr-3 text-xl textfoodprice">ราคาอาหาร :</p>
        <input v-model="foodPrice" type="number" @input="checkFoodPrice"
          :placeholder="foodPrice === 0 || isNaN(foodPrice) ? 'กรุณาใส่ราคาอาหาร' : foodPrice"
          class="justify-end text-xl text-center border border-gray-500 rounded-lg inputfoodprice">
        <p v-show="isPersonsWhoEatValid" class="flex justify-center ml-1 font-bold text-red-500 text-md">*จำเป็น</p>
      </div>
    </div>
    <button @click="checkDataBeforeDone"
      class="flex justify-center px-2 mx-auto mt-5 text-2xl hover:bg-gray-200 hover:text-black hover:rounded-lg">ยืนยันการทำรายการ</button>
  </div>
</template>
<style scoped>
@media (max-width: 640px) {
  .backfont {
    font-size: medium;
    font-weight: bold;
    margin-left: 1em;
  }

  .percenttext {
    text-align: center;
  }

  .boxfoodprice {
    flex-wrap: wrap;
  }

  .textfoodprice {
    text-align: center;
    flex: content;
    justify-content: center;
  }

  .inputfoodprice {
    text-align: center;
    flex: content;
    justify-content: end;
    width: 9em;
    font-size: small;
  }

  .m-table {
    width: 98%;
    height: 20em;
  }
}
</style>
