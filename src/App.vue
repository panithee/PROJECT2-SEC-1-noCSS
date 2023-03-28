<script setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import Navbar from './components/Navbar.vue'
import {findKey, getUserGroups, updateGroups} from './composable/FetchFunctions.js'
import Loading from './components/icons/loading.vue'

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
onBeforeMount(async () => {
  console.log('before mount', userData.value)
  await checkLogin();
  console.log('mounted', userData.value)
})

checkLogin()
</script>


<template>
  <Navbar @clearData=clearUserData @setUsername=setUsername></Navbar>
  <router-view v-if="username !== ''" :userData="userData"></router-view>
  <div v-show="loginAlready"> ช่วย Login pls</div>
  <div
      class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
    <div class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" role="status">
      <Loading></Loading>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>



