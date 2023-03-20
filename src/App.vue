<script setup>
import Navbar from './components/Navbar.vue'
import { onBeforeMount, onMounted, provide, ref } from 'vue'
import { getUsernameNow, findKey } from './composable/loginFunctions.js';
let username = ref('')
const getUsername = (name) => {
  console.log('name :' + name)
  username.value = name
  getData()
}
let data = ref([]);
const getData = async () => {
  console.log('username.value :' + username.value);
  if (username.value == '') {
    console.log('username.value is empty');
    data.value = []
  }
  else {
    const result = await getUsernameNow(username.value)
    console.log(result);
    data.value = result
  }
}
onMounted(async () => {
  username.value = localStorage.getItem('username');
  if (username.value == '') {
    console.log('username.value is empty');
    data.value = []
  }
  else {
    const userKey = await findKey(username.value);
    const key = localStorage.getItem("key");
    if (userKey !== key) {
      console.log('key is not match');
      console.log('userKey :' + userKey);
      console.log('key :' + key);
      localStorage.clear();
      username.value = '';
      data.value = [];
    }
    else {
      username.value = localStorage.getItem('username');
      data.value = await getUsernameNow(username.value)
    }
  }
})
const clearData = () => {
  data.value = []
}
provide('data', data);
</script>




<template>
  <Navbar @getUsername=getUsername @clearData="clearData" />
  <div class="container mx-auto">
    <div class="flex flex-col items-center justify-center h-screen">
      {{ data }}
    </div>
  </div>
</template>


