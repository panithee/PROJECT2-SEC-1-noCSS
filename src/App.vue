<script setup>
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import { findKey, getUserGroups, updateGroups } from './composable/FetchFunctions.js'

const username = ref('')
const userData = ref([])
const loginAlready = ref(true)

const fetchUserData = async () => {
  userData.value = await getUserGroups(username.value)
}

const checkLogin = async () => {
  const storedUsername = sessionStorage.getItem('username')
  if (!storedUsername) {
    userData.value = []
    loginAlready.value = true
    return
  }
  try {
    const userKey = await findKey(storedUsername)
    const key = sessionStorage.getItem('key')
    if (userKey !== key) {
      sessionStorage.clear()
      username.value = ''
      userData.value = []
    } else {
      loginAlready.value = false
      username.value = storedUsername
      await fetchUserData()
    }
  } catch (error) {
    console.error(error)
  }
}

const setUsername = async (name) => {
  username.value = name
  loginAlready.value = false
  await fetchUserData()
}

const clearUserData = () => {
  loginAlready.value = true
  userData.value = []
  username.value = ''
  sessionStorage.clear()
}

const updated = (data) => {
  updateGroups(username.value, data)
}
onMounted(() => {
  console.log('mounted', username.value)
})

checkLogin()
</script>


<template>
  <Navbar @clearData=clearUserData @setUsername=setUsername></Navbar>
  <router-view v-if="username !== ''" :userData="userData"></router-view>
  <div v-show="loginAlready"> ช่วย Login pls</div>
</template>



