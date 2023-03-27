<script setup>
import { ref, computed, watchEffect } from "vue"
const props = defineProps({
  userData: {
    type: Array,
    default: []
  },
  mode: {
    type: String,
    default: "add"
  }
})

defineEmits('sendAllData')
const page = ref(true);
const switchMenu = (type) => {
  page.value = type === "equal";
  if (!page.value) calculatePriceByPercent();
};
let food = ref({});
const foodName= ref("");
const foodPrice = ref()

const personsWhoEat = ref([])
const personsList = ref([])
const calculatePriceByPercent = () => {
  if (personsWhoEat.value?.length === undefined) return;
  personsWhoEat.value.map((person) => {
    person.price = parseFloat((food.value.price * Number(person.percentage)) / 100).toFixed(2)
    return person;
  })
}
watchEffect(() => {
  if(props.mode === 'edit'){
  food.value = props?.userData[0]?.meals[0].foods[1] || {};
  personsWhoEat.value = props?.userData[0]?.meals[0].foods[1]?.consumers || [];
  page.value = props?.userData[0]?.meals[0].foods[1]?.splitMode === "equal";
  
}
personsList.value = props?.userData[0]?.members || [];}
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
  const avg = Math.ceil(300 / personsWhoEat.value.length) * 100 / 100
  personsWhoEat.value = personsWhoEat.value.map((a) => {
    a.price = avg;
    return a
  })
  return Math.ceil(300 / personsWhoEat.value.length) * 100 / 100
});



const inputPercent = (event, index) => {
  const percentage = event.target.value;
  personsWhoEat.value[index].percentage = percentage > 100 || percentage < 0 ? 0 : percentage;
  calculatePriceByPercent();
};


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
const checkPersonEating = (id) => personsWhoEat.value?.some((person) => person.id === id);

</script>

<template>
  {{ personsWhoEat }}
  <div class="w-full h-full">
    <button class="flex ml-10 text-3xl">Back</button>
    <input type="text" placeholder="Add your food name" v-model="foodName"  class="flex justify-center mx-auto border rounded-lg text-center text-2xl">
    <p class="flex justify-center mt-5 text-lg text-gray-600">Average by</p>
    <div class="flex justify-center">
      <img src="../assets/AkarIconsEqual.svg" class="mr-2 cursor-pointer" @click="switchMenu('equal')"
        :class="page === true ? 'opacity-100' : 'opacity-10'" alt="" />
      <img src="../assets/MdiPercentCircleOutline.svg" class="cursor-pointer" @click="switchMenu('percentage')"
        :class="page === false ? 'opacity-100' : 'opacity-10'" alt="" />
    </div>

    <p class="flex justify-center mt-5 text-lg text-gray-600">Member</p>
    <div class="flex justify-center w-1/2 mx-auto bg-white">
      <button class="px-2 mx-2 border border-black rounded-lg" v-for="(person, index) in personsList" :key="index"
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
            <img src="../assets/MaterialSymbolsPercentSharp.svg" class="mx-auto" alt="" />
            <th class="text-end">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300" v-for="(person, index) in personsWhoEat" :key="index">
            <td class="text-xl text-left">{{ person.name }}</td>
            <td class="text-center">
              <input type="number" placeholder="'0-100'" @input="inputPercent($event, index)" min="100" max="0"
                class="w-20 text-center bg-gray-200" v-model="person.percentage" />
            </td>
            <td class="text-xl text-end">{{ person.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between w-3/5 mx-auto mt-10">
      <div class="flex flex-col justify-between">
        <p v-if="!page" class="flex flex-col">
          เปอร์เซ็นต์ทั้งหมด : {{ calculateTotalPercent() }}%
        </p>
        <p v-if="!page" class="flex flex-col">{{ checkPercent() }}</p>
      </div>
      <button @click="$emit('sendAllData',foodName, foodPrice, personsWhoEat)" class="flex justify-center text-2xl">Done</button>
      <input v-model="foodPrice" type="number" placeholder="add your food price" class="border border-gray-500 text-right rounded-lg text-3xl">
    </div>
  </div>
</template>

<style scoped></style>
