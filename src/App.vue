<script setup>
import Navbar from './components/Navbar.vue'
import { onMounted, ref, watch } from 'vue'
import { getUserGroups, findKey, updateGroups } from './composable/loginFunctions.js';
const username = ref('');
const userData = ref();

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
      sessionStorage.setItem('data', JSON.stringify(userData.value));
      userData.value[1].name = 'test';
      userData.value[1].name = 'test2';
    }
  }
});
watch(() => userData.value, (newVal, oldVal) => {
  console.log('watch: ' + newVal);
  sessionStorage.setItem('data', JSON.stringify(newVal));
  if (sessionStorage.getItem('username') !== null) {

    updateGroups(username.value, newVal);
  }
});

// watch

const updated = (data) => {
  console.log('updatedate: ' + data);
  userData.value = data;
};
</script>

<template>
  <Navbar @getUsername=setUsername @clearData=clearUserData />
  <router-view ></router-view>
  <!-- <div class="w-screen h-screen overflow-hidden bg-slate-500">

                          </div> -->
</template>



