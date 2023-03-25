<script setup>
import { ref, computed, watch } from "vue"

const page = ref(true)

const switchMenu = (type) => {
  if (type === "equal") {
    page.value = true
  } else if (type === "percent") {
    page.value = false
  }
}
// const props = defineProps({
//     userData: {
//         type: Array,
//         required: true
//     }
// })

let food = ref([{ foodname: "น้ำตก", price: 300 }])
// let food = ref();

const personsWhoEat = ref([])
const personList = ref([{ name: "John", status: false, price: 0, percent: 0 }, { name: "Three", status: false, price: 0, percent: 0 },
{ name: "Eve", status: false, price: 0, percent: 0 }, { name: "Mo", status: false, price: 0, percent: 0 }, { name: "A", status: false, price: 0, percent: 0 },
{ name: "B", status: false, price: 0, percent: 0 }, { name: "C", status: false, price: 0, percent: 0 },
{ name: "e", status: false, price: 0, percent: 0 }, { name: "d", status: false, price: 0, percent: 0 },
{ name: "F", status: false, price: 0, percent: 0 }, { name: "G", status: false, price: 0, percent: 0 },
{ name: "H", status: false, price: 0, percent: 0 }, { name: "I", status: false, price: 0, percent: 0 }])



const togglePersonWhoEat = (event) => {
  const index = event.target.id;
  personList.value[index].status = !personList.value[index].status

  if (personList.value[index].status === true) {
    if (!personsWhoEat.value.includes(personList.value[index])) {
      personsWhoEat.value.push(personList.value[index])
      console.log(personsWhoEat.value)
    }
  } else if (personList.value[index].status === false) {
    personsWhoEat.value = personsWhoEat.value.filter((person) => person !== personList.value[index])
    console.log(personsWhoEat.value)
  }
}


const avgPricePerPerson = computed(() => {
  if (personsWhoEat.value.length <= 0) {
    return 0
  }
  const price = food.value[0].price
  const numPersons = personsWhoEat.value.length
  const result = price / numPersons
  return Math.ceil(result * 100) / 100
});


const calculatePriceByPercent = (event, index) => {
  const percent = event.target.value
  if (!isNaN(percent)) {
    personsWhoEat.value[index].percent = Number(percent)
  }
  const foodPrice = parseFloat((food.value[0].price * percent) / 100).toFixed(2)
  console.log(personsWhoEat.value[index].percent)
  personsWhoEat.value[index].price = foodPrice
  console.log(personsWhoEat)
  console.log(foodPrice)
  return foodPrice
}

const calculateTotalPercent = () => {
  let totalPercent = personsWhoEat.value.reduce((totalPercent, currentPercent) => {
    return totalPercent + currentPercent.percent
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





// const totalPrice = computed(() => food .value[0].price)

</script>

<template>
  <br>
  <div class="w-full h-full">
    <button class="flex text-3xl ml-10">Back</button>
    <p class="flex justify-center text-4xl pt-5">{{ food[0].foodname }}</p>
    <p class="flex justify-center text-lg mt-5 text-gray-600">Average by</p>
    <div class="flex justify-center">
      <img src="../assets/AkarIconsEqual.svg" class="mr-2 cursor-pointer" @click="switchMenu('equal')"
        :class="page === true ? 'opacity-100' : 'opacity-10'" />
      <img src="../assets/MdiPercentCircleOutline.svg" class="cursor-pointer" @click="switchMenu('percent')"
        :class="page === false ? 'opacity-100' : 'opacity-10'" />
    </div>

    <p class="flex justify-center text-lg text-gray-600 mt-5">Member</p>
    <div class="w-1/2 flex bg-white justify-center mx-auto">
      <button class="border border-black rounded-lg px-2 mx-2" v-for="(person, index) in personList" :key="index"
        :id="index" @click="togglePersonWhoEat($event)"
        :class="(person.status === true) ? 'bg-white hover:bg-gray-200  border-black text-black' : 'bg-white hover:bg-gray-200 hover:text-black border-gray-200 text-gray-300'">
        {{ person.name }}
      </button>
    </div>


    <div class="w-3/5 h-96 mx-auto flex overflow-y-scroll p-4" v-if="page">
      <table class="w-full mx-auto mt-4">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <th class="text-right">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300" v-for="(person, index) in personsWhoEat" :key="index">
            <td class="text-left text-xl">{{ person.name }}</td>
            <td class="text-end text-xl">{{ avgPricePerPerson }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="w-3/5 h-96 mx-auto flex overflow-y-scroll p-4" v-if="!page">
      <table class="w-full mx-auto mt-4">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <img src="../assets/MaterialSymbolsPercentSharp.svg" class="mx-auto" />
            <th class="text-end">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300 " v-for="(person, index) in personsWhoEat" :key="index">
            <td class="text-left text-xl">{{ person.name }}</td>
            <td class="text-center">
              <input type="number" placeholder="0-100" @input="calculatePriceByPercent($event, index)" min="100" max="0"
                class="bg-gray-200 w-20 text-center" />
            </td>
            <td class="text-end text-xl">{{ person.price }} </td>
          </tr>
        </tbody>
      </table>
    </div>



    <div class="w-3/5 mx-auto grid grid-cols-3 gap-x-6 mt-10 items-center">
      <p class="col-span-1 text-2xl">Done</p>
      <div class="col-span-1">
        <p v-if="!page" class="flex flex-col">เปอร์เซ็นต์ทั้งหมด : {{ calculateTotalPercent() }}%</p>
        <p v-if="!page" class="flex flex-col">{{ checkPercent() }}</p>
      </div>
      <p class="underline col-span-1 text-3xl">ราคาอาหาร: {{ food[0].price }}</p>
      <p class="col-span-3 text-2xl mt-3 justify-self-center">Delete</p>
    </div>







  </div>
</template>

<style scoped></style>
