<!--suppress ALL -->
<script setup>
// import { computed, onBeforeUpdate, ref } from "vue"

// const props = defineProps({
//   userData: {
//     type: Array,
//     default: []
//   },
//   mode: {
//     type: String,
//     default: "add"
//   }
// })

// defineEmits('sendAllData')
// const page = ref(true);
// const switchMenu = (type) => {
//   page.value = type === "equal";
//   if (!page.value) calculatePriceByPercent();
// };
// let food = ref({});
// const foodName = ref("");
// const foodPrice = ref()
// const tt = ref(false)
// const personsWhoEat = ref([])

// const personsWhoEat2 = ref([])

// const personsList = ref([])
// const calculatePriceByPercent = () => {
//   if (personsWhoEat.value?.length === undefined) return;
//   personsWhoEat.value.map((person) => {
//     person.price = parseFloat((foodPrice.value * Number(person.percentage)) / 100).toFixed(2)
//     return person;
//   })
// }
// const clere = () => {
//   if (tt.value == false) {
//     tt.value = !tt.value
//   }
// }
// let food = ref({});
// const personsWhoEat = ref()
// onBeforeUpdate(() => {
//   food.value = props.userData[0]?.meals[0].foods[1]
//   personsWhoEat.value = food.value?.consumers ?? [];
// })
// const personList = computed(() => {
//   return props.userData[0]?.members ?? []
// })


// const togglePersonWhoEat = (event) => {
//   const index = event.target.id;
//   if (!checkPersonEating(personList.value[index].id)) {
//     console.log("donthave.value")
//     personsWhoEat.value.push(personList.value[index])
//     console.log(personsWhoEat.value)
//   } else {
//     console.log("have.value")
//     personsWhoEat.value = personsWhoEat.value.filter((person) => person !== personList.value[index])
//     console.log(personsWhoEat.value)
//   }

// }


// const avgPricePerPerson = computed(() => {
//   const avg = Math.ceil(foodPrice.value / personsWhoEat.value.length) * 100 / 100
//   personsWhoEat.value = personsWhoEat.value.map((a) => {
//     a.price = avg;
//     return a
//   })
//   return Math.ceil(foodPrice.value / personsWhoEat.value.length) * 100 / 100
// });



// const inputPercent = (event, index) => {
//   const percentage = event.target.value;
//   personsWhoEat.value[index].percentage = percentage > 100 || percentage < 0 ? 0 : percentage;
//   calculatePriceByPercent();
// };


// const calculateTotalPercent = () => {
//   if (personsWhoEat.value?.length === undefined) return 0;
//   let totalPercent = personsWhoEat.value.reduce((totalPercent, currentPercent) => {
//     return totalPercent + Number(currentPercent.percentage)
//   }, 0)
//   return totalPercent
// }

// const checkPercent = () => {
//   const totalPercent = calculateTotalPercent()
//   if (totalPercent <= 100) {
//     return `ขาดอีก : ${100 - totalPercent}%`
//   } else if (totalPercent > 100) {
//     return `เกินมา : ${totalPercent - 100}%`
//   }
// }
// const checkPersonEating = (id) => personsWhoEat.value?.some((person) => person.id === id);


< !--
</script>-->

<template>
  <!-- {{ userData[0]?.meals[0].foods[1] }}
    <br />
    <div class="w-full h-full">
      <button class="flex ml-10 text-3xl">Back</button>
      <input type="text" placeholder="Add your food name" v-model="foodName"
        class="flex justify-center mx-auto text-2xl text-center border rounded-lg">
      <p class="flex justify-center mt-5 text-lg text-gray-600">Average by</p>
      <div class="flex justify-center">
        <img :class="page === true ? 'opacity-100' : 'opacity-10'" alt="" class="mr-2 cursor-pointer"
          src="../assets/AkarIconsEqual.svg" @click="switchMenu('equal')" />
        <img :class="page === false ? 'opacity-100' : 'opacity-10'" alt="" class="cursor-pointer"
          src="../assets/MdiPercentCircleOutline.svg" @click="switchMenu('percentage')" />
      </div>

      <p class="flex justify-center mt-5 text-lg text-gray-600">Member</p>
      <div class="flex justify-center w-1/2 mx-auto bg-white">
        <button v-for="(person, index) in personList" :id="index" :key="index" :class="
          checkPersonEating(person.id)
            ? 'bg-white hover:bg-gray-200  border-black text-black'
            : 'bg-white hover:bg-gray-200 hover:text-black border-gray-200 text-gray-300'
        " class="px-2 mx-2 border border-black rounded-lg" @click="togglePersonWhoEat($event)">
          {{ person?.name }}
        </button>
      </div>

      <div v-if="page" class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96">
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

      <div v-if="!page" class="flex w-3/5 p-4 mx-auto overflow-y-scroll h-96">
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
                <input :placeholder="showPercentplaceholder(index)" class="w-20 text-center bg-gray-200" max="0" min="100"
                  type="number" @input="inputPercent($event, index)" />
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
        <button @click="$emit('sendAllData', foodName, foodPrice, personsWhoEat, tt), clere()"
          class="flex justify-center text-2xl">Done</button>
        <input v-model="foodPrice" type="number" placeholder="add your food price"
          class="text-3xl text-right border border-gray-500 rounded-lg">
      </div>
    </div> -->
  hi
</template>

<!--<style scoped></style>-->
<template></template>