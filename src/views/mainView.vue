<template>
  <div className="mainView">
    <div className=" h-screen m-[50px]">

      <span className=" text-[25px]">
        รายการมื้ออาหาร
      </span>
      <h1>testtt</h1>
      <!--      {{ props.userData }}-->
      <hr>
      list

      <!--      {{ g_list }}-->
      <!--
     {{ g_list }} -->
      <!-- {{ userData.filter( e => e.name = "a") }} -->
      <!-- <div>{{ userData }}</div> -->
      <!--
     {{ g_list }} -->
      <label className="sr-only" htmlFor="underline_select">Underline select</label>
      <select id="underline_select" v-model="g_name"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
      <div v-for="(meal, index) in g_list.meals">
        <div>
          <p> {{ meal.name }}</p>
          <!--          {{ meals.foods }}-->
          <button @click="mealChoose.data = meal">Edit</button>
          <div v-for="food in meal.foods">

            <li>{{ food.name }} : {{ food.price }}</li>
          </div>
        </div>
      </div>
    </div>
    <div>
      <oat-view :mealData="mealChoose.data" :member="g_list.members"></oat-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Group from '../components/Group.vue';
import OatView from "@/views/oatView.vue";

const g_name = ref("")
const g_list = ref({})
const props = defineProps({
  userData: {
    type: Array, default: []
  }
})
const mealChoose = ref({ data: {}, index: -1 });
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
defineEmits(['updated'])

</script>

<style scoped></style>