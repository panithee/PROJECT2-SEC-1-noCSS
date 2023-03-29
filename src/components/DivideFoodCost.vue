<script setup>
import { ref, computed } from "vue"

const page = ref(true)

defineEmits(['sendAllData'])

const switchMenu = (type) => {
  if (type === "equal") {
    page.value = true
  } else if (type === "percentage") {
    console.log(personList)
    page.value = false
    calculatePriceByPercent();
  }
}
let food = ref({});
const personsWhoEat = ref()
onBeforeUpdate(() => {
  food.value = props.userData[0]?.meals[0].foods[1]
  personsWhoEat.value = food.value?.consumers ?? [];
})
const personList = computed(() => {
  return props.userData[0]?.members ?? []
})



const togglePersonWhoEat = (event) => {
  const index = event.target.id;
  if (!checkPersonEating(personList.value[index].id)) {
    console.log("donthave.value")
    personsWhoEat.value.push(personList.value[index])
    console.log(personsWhoEat.value)
  }
  else {
    console.log("have.value")
    personsWhoEat.value = personsWhoEat.value.filter((person) => person !== personList.value[index])
    console.log(personsWhoEat.value)
  }
}


const avgPricePerPerson = computed(() => {
  if (personsWhoEat.value.length <= 0) {
    return 0
  }
  // const price = food.value[0].price
  const price = 1
  const numPersons = personsWhoEat.value.length
  const result = price / numPersons
  return Math.ceil(result * 100) / 100
});


const calculatePriceByPercent = (event, index) => {
  const percent = event.target.value
  if (!isNaN(percent)) {
    personsWhoEat.value[index].percent = Number(percent)
  }
  const foodPrice = parseFloat((1 * percent) / 100).toFixed(2)
  console.log(personsWhoEat.value[index].percent)
  personsWhoEat.value[index].price = foodPrice
  console.log(personsWhoEat)
  console.log(foodPrice)
  return foodPrice
}

const calculateTotalPercent = () => {
  if (personsWhoEat.value?.length === undefined) return 0;
  let totalPercent = personsWhoEat.value.reduce((totalPercent, currentPercent) => {
    return totalPercent + currentPercent.percentage
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
const showPercentplaceholder = (index) => {
  const percentage = personsWhoEat.value[index].percentage;
  if (percentage > 0 && percentage <= 100) {
    return percentage;
  }
  return '0-100'
}
const checkPersonEating = (id) => {
  if (personsWhoEat.value?.length > 0) {
    console.log("Its Work", id);
    return personsWhoEat.value?.filter(person => person.id == id).length > 0;
  }


const foodName = ref('')
const foodPrice = ref()


// const totalPrice = computed(() => food .value[0].price)

</script>

<template>
  {{ userData[0]?.meals[0].foods[1] }}
  <br />
  <div class="w-full h-full">
    <button class="flex text-3xl ml-10">Back</button>
    <!-- <p class="flex justify-center text-4xl pt-5">{{ food[0].foodname }}</p> -->
    <input type="text" placeholder="Add your food name" v-model="foodName"  class="flex justify-center mx-auto border rounded-lg text-center text-2xl">
    <p class="flex justify-center text-lg mt-5 text-gray-600">Average by</p>
    <div class="flex justify-center">
      <img src="../assets/AkarIconsEqual.svg" class="mr-2 cursor-pointer" @click="switchMenu('equal')"
        :class="page === true ? 'opacity-100' : 'opacity-10'" />
      <img src="../assets/MdiPercentCircleOutline.svg" class="cursor-pointer" @click="switchMenu('percentage')"
        :class="page === false ? 'opacity-100' : 'opacity-10'" />
    </div>

    <p class="flex justify-center mt-5 text-lg text-gray-600">Member</p>
    <div class="flex justify-center w-1/2 mx-auto bg-white">
      <button class="px-2 mx-2 border border-black rounded-lg" v-for="(person, index) in personList" :key="index"
        :id="index" @click="togglePersonWhoEat($event)" :class="
          checkPersonEating(person.id)
            ? 'bg-white hover:bg-gray-200  border-black text-black'
            : 'bg-white hover:bg-gray-200 hover:text-black border-gray-200 text-gray-300'
        ">
        {{ person?.name }}
      </button>
    </div>

    <div class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96" v-if="page">
      <table class="w-full mx-auto mt-4">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <th class="text-right">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300" v-for="(person, index) in personsWhoEat" :key="index">
            <td class="text-xl text-left">{{ person?.name }}</td>
            <td class="text-xl text-end">{{ avgPricePerPerson }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96" v-if="!page">
      <table class="w-full mx-auto mt-4">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <img src="../assets/MaterialSymbolsPercentSharp.svg" class="mx-auto" />
            <th class="text-end">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300" v-for="(person, index) in personsWhoEat" :key="index">
            <td class="text-xl text-left">{{ person.name }}</td>
            <td class="text-center">
              <input type="number" :placeholder="showPercentplaceholder(index)" @input="inputPercent($event, index)"
                min="100" max="0" class="w-20 text-center bg-gray-200" />
            </td>
            <td class="text-xl text-end">{{ person.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>



    <div class="w-3/5 mx-auto grid grid-cols-3 gap-x-6 mt-10 items-center">
      <p @click="$emit('sendAllData',foodName, foodPrice, personsWhoEat)" class="col-span-1 text-2xl">Done</p>
      <div class="col-span-1">
        <p v-if="!page" class="flex flex-col">
          เปอร์เซ็นต์ทั้งหมด : {{ calculateTotalPercent() }}%
        </p>
        <p v-if="!page" class="flex flex-col">{{ checkPercent() }}</p>
      </div>
      <input v-model="foodPrice" placeholder="add your food price" class="border border-gray-500 text-right rounded-lg text-3xl">
      <p class="col-span-3 text-2xl mt-3 justify-self-center">Delete</p>
    </div>
  </div>
</template>

<style scoped></style>
