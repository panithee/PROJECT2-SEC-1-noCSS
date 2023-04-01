<template>
  <div class="mainView">
    <div class=" h-screen m-[50px]">

      <span class=" text-[25px]">
        รายการมื้ออาหาร
      </span>
      <h1>data</h1>
      {{ props.userData }}
      <hr>
      list

      {{ g_list }}
      <!--      
     {{ g_list }} -->
      <!-- {{ userData.filter( e => e.name = "a") }} -->
      <!-- <div>{{ userData }}</div> -->
      <!-- 
     {{ g_list }} -->
      <label class="sr-only" for="underline_select">Underline select</label>
      <select id="underline_select" v-model="g_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              @click="show">

        <option v-for="item2 in props.userData ">{{ item2.name }}</option>

      </select>

      <div>
        <span> Member list</span>
        <ul>
          <li v-for="item in g_list.members">
            {{ item }}

          </li>
        </ul>
        <br>

      </div>

      <br>
      <div v-for="meals in g_list.meals">
        <div>
          <p> {{ meals.name }}</p>
          <!--          {{ meals.foods }}-->
          <div v-for="food in meals.foods">
            <li>{{ food.name }} : {{ food.price }}</li>
          </div>
        </div>
      </div>
    </div>
    <div>
      <oat-view class=""></oat-view>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Group from '../components/Group.vue';
import OatView from "@/views/oatView.vue";

const g_name = ref("")
const g_list = ref({})
const props = defineProps({
  userData: {
    type: Array, default: []
  }
})
const show = () => {
  if (g_name.value == "") {
    g_list.value = {}
  } else {
    g_list.value = (props.userData.find(e => e.name == g_name.value))
  }

}


</script>

<style scoped></style>