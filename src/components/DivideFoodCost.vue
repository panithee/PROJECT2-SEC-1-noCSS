<script setup>
import { computed, ref, watchEffect } from "vue"

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
const emit = defineEmits(['back', 'save'])
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

const calculatePriceByPercent = () => {
  if (personsWhoEat.value?.length === undefined) return;
  personsWhoEat.value.map((person) => {
    if (foodPrice.value === undefined || foodPrice.value === 0) {
      person.price = 0;
      person.percentage = 0;
      return person
    }
    console.log(person.percentage)
    person.price = ((foodPrice.value * Number(person.percentage)) / 100).toFixed(2)
    return person;
  })
}

const avgPricePerPerson = computed(() => {
  if (isNaN(foodPrice.value) || foodPrice.value < 0) {
    foodPrice.value = 0
  }
  return (Math.ceil(foodPrice.value / personsWhoEat.value.length * 100) / 100).toFixed(2)
});

const inputPercent = (event, index) => {
  const percentage = event.target.value;
  personsWhoEat.value[index].percentage = percentage > 100 || percentage < 0 ? 0 : percentage;
  calculatePriceByPercent();
};

const saveAvgPrice = () => {
  if (foodPrice.value === undefined) return 0;
  const avg = (Math.ceil(foodPrice.value / personsWhoEat.value.length * 100) / 100).toFixed(2)
  personsWhoEat.value = personsWhoEat.value.map((a) => {
    a.price = avg;
    a.percentage = 0;
    return a
  })
}

const checkFoodPrice = () => {
  if (foodPrice.value < 0) {
    foodPrice.value = 0
  }
  if (page.value) {
    saveAvgPrice();
  } else {
    calculatePriceByPercent();
  }
}

const checkPercent = () => {
  const totalPercent = calculateTotalPercent()
  if (totalPercent <= 100) {
    return `ขาดอีก : ${100 - totalPercent}%`
  } else if (totalPercent > 100) {
    return `เกินมา : ${totalPercent - 100}%`
  }
}

const calculateTotalPercent = () => {
  if (personsWhoEat.value?.length === undefined) return 0;
  let totalPercent = personsWhoEat.value.reduce((totalPercent, currentPercent) => {
    return totalPercent + Number(currentPercent.percentage)
  }, 0)
  return totalPercent
}

const checkPersonEating = (name) => personsWhoEat.value?.some((person) => person.name === name);

const togglePersonWhoEat = (event) => {
  const index = event.target.id;
  console.log(personsList.value[index])
  if (personsList.value[index] === undefined) return;
  if (!checkPersonEating(personsList.value[index]?.name)) {
    personsWhoEat.value.push({
      "name": personsList.value[index].name,
      "percentage": 0,
      "price": 0
    })
    if (page.value) {
      saveAvgPrice();
    }
    console.log(personsWhoEat.value)
    personsWhoEat.value.sort((a, b) => a.name - b.name)
  } else {
    personsWhoEat.value = personsWhoEat.value.filter((person) => person.name !== personsList.value[index].name)
  }
}

const checkDataBeforeDone = () => {
  if (foodName.value.trim() === "") {
    isFoodNameValid.value = true
  } else {
    isFoodNameValid.value = false
  }
  console.log(foodPrice.value)
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
    food.value = {
      "name": foodName.value,
      "price": foodPrice.value,
      "consumers": personsWhoEat.value,
      "splitMode": page.value ? "equal" : "percentage"
    }
    return emit('save', food.value);
  }
}

</script>
<template>
  <div class="w-full h-full">
    <button class="flex px-2 ml-10 text-xl font-semibold hover:bg-white hover:text-black hover:rounded-lg w-fit backfont"
      @click="$emit('back')">ย้อนกลับ
    </button>
    <input v-model="foodName" class="flex justify-center mx-auto text-2xl text-center border rounded-lg"
      placeholder="กรุณาใส่ชื่ออาหาร" type="text">
    <p v-show="isFoodNameValid" class="flex justify-center font-bold text-red-500 text-md">*จำเป็น</p>
    <p class="flex justify-center mt-3 text-lg text-gray-600">เลือกโหมดการหาร</p>
    <div class="flex justify-center">
      <img :class="page === true ? 'opacity-100' : 'opacity-10'" alt="" class="mr-2 cursor-pointer"
        src="../assets/AkarIconsEqual.svg" @click="switchMenu('equal')" />
      <img :class="page === false ? 'opacity-100' : 'opacity-10'" alt="" class="cursor-pointer"
        src="../assets/MdiPercentCircleOutline.svg" @click="switchMenu('percentage')" />
    </div>
    <p class="flex justify-center mt-3 text-lg text-gray-600">รายชื่อคนทั้งหมดในกลุ่ม</p>
    <p v-show="isPersonsWhoEatValid" class="flex justify-center font-bold text-red-500 text-md">*จำเป็น</p>
    <div class="flex justify-between w-64 pb-2 mx-auto mt-2 overflow-x-scroll">
      <button v-for="(person, index) in personsList" :key="index" :class="
        checkPersonEating(person.name)
          ? 'bg-white hover:bg-gray-200  border-black text-black'
          : 'bg-white hover:bg-gray-200 hover:text-black border-gray-200 text-gray-300'"
        class="px-2 mx-2 border border-black rounded-lg" :id="index" @click="togglePersonWhoEat($event)">
        {{ person?.name }}
      </button>
    </div>
    <div v-if="page" class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96 m-height m-table">
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
    <div v-if="!page" class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96 m-table">
      <table class="w-full mx-auto mt-4">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <img alt="" class="mx-auto" src="../assets/MaterialSymbolsPercentSharp.svg" />
            <th class="text-end">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in personsWhoEat" :key="index" class="border-b border-gray-300">
            <td class="text-xl text-left">{{ person.name }}</td>
            <td class="text-center">
              <input v-model="person.percentage" class="w-20 text-center bg-gray-200" max="100" min="0"
                placeholder="'0-100'" type="number" @input="inputPercent($event, index)" />
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
        <input v-model="foodPrice" :placeholder="foodPrice === 0 || isNaN(foodPrice) ? 'กรุณาใส่ราคาอาหาร' : foodPrice"
          class="justify-end text-xl text-center border border-gray-500 rounded-lg inputfoodprice" type="number"
          @input="checkFoodPrice">
        <p v-show="isFoodPriceValid" class="flex justify-center ml-1 font-bold text-red-500 text-md">*จำเป็น</p>
      </div>
    </div>
    <button
      class="flex justify-center px-2 mx-auto mt-5 text-2xl shadow-md hover:bg-white hover:text-black hover:rounded-lg"
      @click="checkDataBeforeDone">
      ยืนยันการทำรายการ
    </button>
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
