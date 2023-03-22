<script setup>
import Navbar from './components/Navbar.vue'
import { onMounted, provide, ref } from 'vue'
import { getUserGroups, findKey } from './composable/loginFunctions.js';
import Group from './components/Group.vue';

const username = ref('');
const userData = ref([]);

const setUsername = (name) => {
  console.log('setUsername: ' + name);
  username.value = name;
  fetchUserData();
};
const fetchUserData = async () => {
  console.log('fetchUserData: ' + username.value);
  if (!username.value) {
    console.log('Username is empty');
    userData.value = [];
  } else {
    const result = await getUserGroups(username.value);
    console.log('Result: ', result);
    userData.value = result;
  }
};
const clearUserData = () => {
  userData.value = [];
};
onMounted(async () => {
  username.value = sessionStorage.getItem('username');
  if (!username.value) {
    console.log('Username is empty');
    userData.value = [];
  } else {
    const userKey = await findKey(username.value);
    const key = sessionStorage.getItem('key');
    if (userKey !== key) {
      console.log('Key is not a match');
      console.log('userKey: ' + userKey);
      console.log('key: ' + key);
      sessionStorage.clear();
      username.value = '';
      userData.value = [];
    } else {
      username.value = sessionStorage.getItem('username');
      userData.value = await getUserGroups(username.value);
    }
  }
});



provide('userData', {userData});
console.log(userData);
</script>

<template>
  <div class="w-screen h-screen overflow-hidden">
    <Navbar @getUsername=setUsername @clearData=clearUserData />   
    <Group></Group>
  </div>
  <div>{{ userData }}</div>
</template>



