<script setup>
import { ref, computed, onBeforeUpdate } from "vue"
const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})
const page = computed(() => {
  if (food?.value?.splitMode === "equal") {
    return true
  }
  return false
})

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
  console.log("ji")
  const avg = Math.ceil(300 / personsWhoEat.value.length) * 100 / 100
  personsWhoEat.value = personsWhoEat.value.map((a) => {
    a.price = avg;
    return a
  })
  return Math.ceil(300 / personsWhoEat.value.length) * 100 / 100
});


const calculatePriceByPercent = () => {

  console.log("pers");
  personsWhoEat.value.map((person) => {
    person.price = parseFloat((food.price * person.percentage) / 100).toFixed(2)
    return person;
  })
}
const inputPercent = (event, index) => {
  const percentage = event.target.value
  personsWhoEat.value[index].percentage = Number(percentage);
  calculatePriceByPercent();
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

}
</script>

<template>
  {{ userData[0]?.meals[0].foods[1] }}
  <br />
  <div class="w-full h-full">
    <button class="flex ml-10 text-3xl">Back</button>
    <p class="flex justify-center pt-5 text-4xl">{{ food?.name }}</p>
    <p class="flex justify-center mt-5 text-lg text-gray-600">Average by</p>
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

    <div class="grid items-center w-3/5 grid-cols-3 mx-auto mt-10 gap-x-6">
      <p class="col-span-1 text-2xl">Done</p>
      <div class="col-span-1">
        <p v-if="!page" class="flex flex-col">
          เปอร์เซ็นต์ทั้งหมด : {{ calculateTotalPercent() }}%
        </p>
        <p v-if="!page" class="flex flex-col">{{ checkPercent() }}</p>
      </div>
      <p class="col-span-1 text-3xl underline">ราคาอาหาร: {{ food?.price }}</p>
      <p class="col-span-3 mt-3 text-2xl justify-self-center">Delete</p>
    </div>
  </div>
</template>

<style scoped></style>
