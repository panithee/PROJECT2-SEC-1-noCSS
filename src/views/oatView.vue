<template>
  <div class="oatView" v-if="t == false">
   <!-- {{ foodlist}}
   {{ personsWhoEat3 }} -->
   
    <span class="bg-black text-white">
        กลุ่มโม
     </span>
     <div class="flex justify-between  w-40 m-5">
        <span>Black</span>
        <span>มื้ออาหาร</span>
     </div>
     <div class=" ml-[110px]">
        <input v-model="mealname" class="border border-b-black text-[25px]" type="text" placeholder="Meal name">
     </div>
     
        <div class="container m-auto " >
      <div class="flex flex-col  h-[60vh]">
       <div v-if="foodlist.length == 1">
            <!-- <input class="border border-black text-[40px] rounded-full" type="text" placeholder="Add ur food ~~"> -->
       </div>
       <div v-else class=" w-full">
        <ul>
          <li v-for="item in foodlist.slice(1)">
            <div class="h-[100px] ">
              <div >
                <span class="text-[25px]">{{ item.foodname }}</span>
                <span class="text-[25px] float-right">{{ item.foodPrice }}</span>
              </div>
              <hr>
              <div class="flex flex-row ">
                
                <span v-for="item2 in item.oc.map(e=>e.name)"  class="text-[20px] border border-black  rounded-[10px] p-[3px] m-[3px]">{{item2 }}</span>
             
              </div>
              
            </div>
         
        </li>
        </ul>
       
       </div>
       
      </div>
      <button class="float-right" @click="show()"><img src="../assets/img/add-icon.png" alt=""></button>
    </div>
    
     
    
  </div>

  <DivideFoodCost :userData="userData" @sendAllData="test" :mode="'add'" v-if="t == true"/>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import DivideFoodCost from '../components/DivideFoodCost.vue';
const props = defineProps({
  userData: {
    type: Array,
    default: []
  }
})
const t = ref(false)
const show =()=>{
  if(t.value == false){
    t.value = !t.value
  }
}
onMounted(() => {
  console.log(props.userData.value)
})
console.log(props.userData.value)
const foodlist = ref([])
const mealname = ref('')
const foodName1 = ref('')
const foodPrice2 = ref()
const personsWhoEat3 = ref([])
const member = ref([])
const test = (foodName, foodPrice, personsWhoEat,tt) => {
    foodName1.value = foodName
    foodPrice2.value = foodPrice
    personsWhoEat3.value = personsWhoEat

      // console.log(personsWhoEat3.value[0].name)
      // member = personsWhoEat3.value[0].name
    
      // console.log(  Array.from(personsWhoEat));
      foodlist.value.push({"foodname":foodName1.value,"foodPrice":foodPrice2.value,"oc":personsWhoEat3.value})
     if (tt == false) {
      t.value = !t.value
     }
     

    
     
}

test()
//console.log(foodlist);
</script>

<style scoped></style>