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
      <label for="underline_select" class="sr-only">Underline select</label>
      <select v-model="g_name" @click="show" id="underline_select"
        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">

        <option v-for="item2 in props.userData ">{{ item2.name }}</option>

      </select>

      <div>
        <span> Member list</span>
        <ul>
          <li v-for="item in g_list.members">
            {{ item }}

          </li>
        </ul>


      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Group from '../components/Group.vue';
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
    g_list.value = JSON.parse(JSON.stringify(props.userData.find(e => e.name == g_name.value)))
  }

}



</script>

<style scoped></style>