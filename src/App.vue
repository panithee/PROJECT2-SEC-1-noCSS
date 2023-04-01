<script setup>
import {onBeforeMount, ref} from 'vue'
import Navbar from './components/Navbar.vue'
import {findKey, getUserGroups, updateGroups} from './composable/FetchFunctions.js'
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
  }
  try {
    const userKey = await findKey(storedUsername)
    const key = sessionStorage.getItem('key')
    if (userKey !== key) {
      sessionStorage.clear()
      username.value = ''
      userData.value = []
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
  console.log('before mount', userData.value)
  await checkLogin();
  loading.value = false;
  console.log('mounted', userData.value)
})

checkLogin()
</script>


<template>
  <Navbar @clearData=clearUserData @setUsername=setUsername></Navbar>
  <div class="container mx-auto">
    <router-view @updated="updated" v-if="username !== ''" :userData="userData"></router-view>
    <div v-show="!loginAlready" class="p-8 text-2xl text-center">
      กรุณาเข้าสู่ระบบ
    </div>
    <div v-show="loading" class="absolute inset-0 flex items-center justify-center bg-gray-700">
      <Loading/>
    </div>
  </div>
</template>







