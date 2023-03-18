<script setup>
import { ref, computed } from "vue"


const page = ref(true)

const switchMenu = (type) => {
  if (type === "equal") {
    page.value = true
  } else if (type === "percent") {
    page.value = false
  }
}

const foodList = ref([{foodname: "น้ำตก", price: 293}])


const personList = ref([{name:"John", status:false, price:0}, {name:"Three", status:false, price:0}, 
{name:"Eve", status:false, price:0}, {name:"Mo", status:false, price:0}, {name:"A", status:false, price:0}, {name:"B", status:false, price:0}, {name:"C", status:false, price:0}])

const personsWhoEat = ref([])


const togglePersonWhoEat = (event) => {
  const index = event.target.id;
  personList.value[index].status = !personList.value[index].status
  
  if(personList.value[index].status===true){
    if(!personsWhoEat.value.includes(personList.value[index])){
      personsWhoEat.value.push(personList.value[index])
      console.log(personsWhoEat.value)
    }
  }else if(personList.value[index].status===false){
    personsWhoEat.value = personsWhoEat.value.filter((person) => person !== personList.value[index])
    console.log(personsWhoEat.value)
  }
}

const priceEachPerson = ref(0)

const avgPricePerPerson = computed(() => {
  if(personsWhoEat.value.length <= 0){
    return 0
  }
  const price = foodList.value[0].price
  const numPersons = personsWhoEat.value.length
  const result = price / numPersons
  return Math.ceil(result*100) / 100
});


const totalPrice = computed(() => foodList.value[0].price)

</script>

<template>
    <div class="w-full h-full">
      <p class="flex text-3xl" @click="">Back</p>
      <p class="flex justify-center text-4xl pt-5">น้ำตก</p>
      <p class="flex justify-center text-lg mt-5 text-gray-600">Average by</p>
      <div class="flex justify-center">
        <img
          src="../assets/AkarIconsEqual.svg"
          class="mr-2 cursor-pointer"
          @click="switchMenu('equal')"
          :class="page === true ? 'opacity-100' : 'opacity-10'"
        />
        <img
          src="../assets/MdiPercentCircleOutline.svg"
          class="cursor-pointer"
          @click="switchMenu('percent')"
          :class="page === false ? 'opacity-100' : 'opacity-10'"
        />
      </div>

      <p class="flex justify-center text-lg text-gray-600 mt-5">Member</p>
      <div class="w-1/2 flex bg-white justify-center mx-auto">
        <button class="border border-black rounded-lg px-2 mx-2" v-for="(person,index) in personList" :key="index" :id="index"
        @click="togglePersonWhoEat($event)" :class="(person.status===true)?'bg-white hover:bg-gray-200  border-black text-black' : 'bg-white hover:bg-gray-200 hover:text-black border-gray-200 text-gray-300'">
          {{ person.name }}
        </button>
      </div>

      <table class="w-3/5 mx-auto mt-3" v-if="page">
        <thead>
          <tr>
            <th class="text-left">คนจ่าย</th>
            <th class="text-end">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300 " v-for="(person,index) in personsWhoEat" :key="index">
            <td class="text-left text-xl" >{{ person.name }}</td>
            <td class="text-end text-xl">{{ avgPricePerPerson }} </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!page">
        <p>คนจ่าย</p>
        <p>ราคา</p>
      </div>
    </div>

      <div>
        <button class="flex justify-center mt-48 text-xl w-fit mx-auto">Done</button>
      <button class="flex justify-center mt-1 text-xl text-gray-400 underline w-fit mx-auto">Delete</button>
      <p class="flex underline justify-center ml-96 w-fit text-2xl">Total : {{ totalPrice }}</p>

      </div>
     
      

</template>

<style scoped></style>
