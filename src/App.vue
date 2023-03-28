<script setup>
import Navbar from './components/Navbar.vue'
import { onBeforeMount, ref } from 'vue'
import { findKey, getUserGroups, updateGroups } from './composable/FetchFunctions.js';

const username = ref('');
const userData = ref([]);
const loginAlready = ref(true);

const setUsername = (name) => {
  username.value = name;
  loginAlready.value = false;
  fetchUserData();
};

const fetchUserData = async () => {
  userData.value = await getUserGroups(username.value);
  console.log('finishBefore', userData.value);
};

const clearUserData = () => {
  loginAlready.value = true;
  userData.value = [];
  username.value = '';
  sessionStorage.clear();
};

onBeforeMount(async () => {
  console.log('before mount');
  const storedUsername = sessionStorage.getItem('username');
  if (!storedUsername) {
    userData.value = [];
    loginAlready.value = true;
    return;
  }
  try {
    const userKey = await findKey(storedUsername);
    const key = sessionStorage.getItem('key');
    if (userKey !== key) {
      sessionStorage.clear();
      username.value = '';
      userData.value = [];
    } else {
      loginAlready.value = false;
      username.value = storedUsername;
      await fetchUserData();
    }
  } catch (error) {
    console.error(error);
  }
});

const updated = (data) => {
  updateGroups(username.value, data);
};
</script>

<template>
  <Navbar @clearData=clearUserData @setUsername=setUsername></Navbar>
  <router-view v-if="username !== ''" :userData="userData" @updated="updated"></router-view>
  <div v-show="loginAlready"> ช่วย Login pls</div>
</template>



