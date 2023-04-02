<template>
  <!--  {{ userData }}a-->
  <div className="mainView">
    <div className=" h-screen m-[50px]">

      <span className=" text-[25px]">
        รายการมื้ออาหาร
      </span>
      <hr>
      

      <label className="sr-only" htmlFor="underline_select">Underline select</label>
      <select id="underline_select" v-model="g_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              @click="show">

        <option v-for="item2 in props.userData ">{{ item2.name }}</option>

      </select>

      <div>
        <span> Member list</span>
        <ul class="flex">
          <li v-for="item in g_list.members" class="">
            <span class="px-2 mx-2 border border-black rounded-lg bg-white hover:bg-gray-200  border-black text-black ">   {{ item.name }}</span>
         

          </li>
        </ul>
        <br>

      </div>

      <br>
      <div v-for="(meal,index) in g_list.meals" >
        <div class="border border-black  rounded-lg m-[20px]">
          <p class="m-[20px]"> {{ meal.name }}</p>
          
          
          <div v-for="food in meal.foods" class="m-[20px]">

            <li class=" list-none"><span>{{ food.name }} </span> <span class="float-right">{{ food.price }}</span></li>
            <hr>
          </div>
          <button class="border border-black m-[20px] rounded-lg " @click="mealChoose.data = meal">Edit</button>
        </div>
      </div>
      <div class="flex justify-center m-[20px] ">  
       <button @click="mealChoose.data = g_list.members" >ADD</button>
    </div>
    </div>

    <div>
      <oat-view :mealData="mealChoose.data" :members="g_list.members"></oat-view>
    </div>
  </div>

</template>

<script setup>
import {ref, watch} from 'vue';
import Group from '../components/Group.vue';
import OatView from "@/views/oatView.vue";

const g_name = ref("")
const g_list = ref({})
const props = defineProps({
  userData: {
    type: Array, default: []
  }
})
const mealChoose = ref({data: {}, index: -1});
// watch(mealChoose, (val) => {
//   console.log(val)
// })
const show = () => {
  if (g_name.value == "") {
    g_list.value = {}
  } else {
    g_list.value = (props.userData.find(e => e.name == g_name.value))
  }

}
</script>

<style scoped></style>