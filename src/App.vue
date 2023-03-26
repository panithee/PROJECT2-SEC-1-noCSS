<script setup>
import Navbar from './components/Navbar.vue'
import {onBeforeMount, onMounted, ref} from 'vue'
import {findKey, getUserGroups, updateGroups} from './composable/FetchFunctions.js';

const username = ref('');
const userData = ref([]);
const loginAlready = ref(true);
const setUsername = (name) => {
  username.value = name;
  loginAlready.value = false;
  fetchUserData();
};
const fetchUserData = async () => {
  if (!username.value) {
    userData.value = [];
  } else {
    userData.value = await getUserGroups(username.value);
  }
};
const clearUserData = () => {
  loginAlready.value = true;
  userData.value = [];
  username.value = '';
  sessionStorage.clear();
};
onBeforeMount(() => {
  const storedUsername = sessionStorage.getItem('username');
  if (!storedUsername) {
    userData.value = [];

  }
});
onMounted(async () => {
  try {
    const storedUsername = sessionStorage.getItem('username');
    if (!storedUsername) {
      loginAlready.value = true;
      userData.value = [];
      return;
    }
    loginAlready.value = false;
    const userKey = await findKey(storedUsername);
    const key = sessionStorage.getItem('key');
    if (userKey !== key) {
      sessionStorage.clear();
      username.value = '';
      userData.value = [];
    } else {
      loginAlready.value = false;
      username.value = storedUsername;
      userData.value = await getUserGroups(storedUsername);
    }
    // setInterval(async () => {
    //       const newData = await getUserGroups(username.value);
    //       if (newData !== userData.value) {
    //         userData.value = newData;
    //       }
    //     }
    //     , 1000)
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
  <router-view v-if="username !== ''" :userData="userData"></router-view>
  <div v-show="loginAlready"> ช่วย Login pls</div>
</template>



