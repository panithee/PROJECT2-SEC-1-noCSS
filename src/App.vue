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
    sessionStorage.setItem("isLoggedIn", "false")
  }
  try {
    console.log('check login')
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
      console.log('key match')
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
  <div class="w-full min-h-screen overflow-y-scroll bg-fixed bg-cover bg-hero-mobile sm:bg-hero">
    <Navbar @clearData=clearUserData @setUsername=setUsername></Navbar>
    <div class="container mx-auto">
      <router-view v-if="username !== ''" :userData="userData" @updated="updated"></router-view>
      <div v-show="!loginAlready" class="p-8 text-2xl text-center">
        กรุณาเข้าสู่ระบบ
      </div>
      <div v-show="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Loading/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
