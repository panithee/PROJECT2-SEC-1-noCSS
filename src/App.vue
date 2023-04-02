<script setup>
import { onBeforeMount, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import { findKey, getUserGroups, updateGroups } from './composable/FetchFunctions.js'
import Loading from './components/icons/loading.vue'

const username = ref('')
const userData = ref([])
const loginAlready = ref(false)
const loading = ref(true);
const fetchUserData = async () => {
  userData.value = await getUserGroups(username.value)
}

const checkLogin = async () => {
  const storedUsername = sessionStorage.getItem('username')
  if (!storedUsername) {
    userData.value = []
    loginAlready.value = false
    sessionStorage.setItem("isLoggedIn", "false")
  }
  try {
    const userKey = await findKey(storedUsername)
    const key = sessionStorage.getItem('key')
    if (userKey !== key) {
      sessionStorage.clear()
      username.value = ''
      userData.value = []
      sessionStorage.setItem("isLoggedIn", "false")
      console.log('key not match')
      loginAlready.value = false
    } else {
      loginAlready.value = true
      username.value = storedUsername
      await fetchUserData()
    }
  } catch (error) {
    console.error(error)
  }
}

const setUsername = async (name) => {
  username.value = name
  loginAlready.value = true
  await fetchUserData()
}

const clearUserData = () => {
  loginAlready.value = false
  userData.value = []
  username.value = ''
  sessionStorage.clear()
}

const updated = (data) => {
  updateGroups(username.value, data)
}
onBeforeMount(async () => {
  loginAlready.value = sessionStorage.getItem("isLoggedIn") === "true";
  await checkLogin();
  loading.value = false;
})

</script>
 
<template>
  <div>

  </div>
</template>
 
<style scoped></style>
