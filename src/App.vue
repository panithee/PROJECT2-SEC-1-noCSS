<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
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
  await checkLogin();
  loading.value = false;
})

</script>


<template>
  <div class="bg-gray-100">
    <Navbar @clearData="clearUserData" @setUsername="setUsername"></Navbar>
    <div class="container py-8 mx-auto">
      <div v-show="!loginAlready" class="w-full h-full mb-8 text-3xl font-bold text-center">
        กรุณาเข้าสู่ระบบ
      </div>
      <router-view v-if="username !== ''" :userData="userData" @updated="updated"></router-view>
    </div>
    <div v-show="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Loading />
    </div>
  </div>
</template>







