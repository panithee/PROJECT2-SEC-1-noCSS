<script setup>
import { onMounted, ref } from "vue";
import LoginOverlay from "./login/LoginOverlay.vue";

const isLoggedIn = ref(false);
isLoggedIn.value = sessionStorage.getItem("isLoggedIn") === "true";
const showLoginOverlay = ref(false);
const toggleLoginOverlay = () => {
  showLoginOverlay.value = !showLoginOverlay.value;
};
const emitEvents = defineEmits(["setUsername", 'clearData']);
const handleLoginEvent = (payload) => {
  toggleMenu();
  if (isLoggedIn.value) {
    sessionStorage.clear();
    emitEvents('clearData');
    isLoggedIn.value = false;
  } else if (payload.status === "login") {
    sessionStorage.setItem("isLoggedIn", "true");
    isLoggedIn.value = true;
    showLoginOverlay.value = false;
    emitEvents("setUsername", payload.data)
  } else {
    toggleLoginOverlay();
  }
};
onMounted(() => {
  if (sessionStorage.getItem("isLoggedIn") === "true" && sessionStorage.getItem("username") !== null) {
    isLoggedIn.value = true;
  }
});
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
<template>
  <div class="navbar bg-base-100">
    <div class="flex items-center justify-between w-full px-4 py-3">
      <a class="text-xl normal-case btn btn-ghost">NO CSS</a>
      <div class="right-0 flex-none">
        <button @click="toggleMenu" class="right-0 block text-gray-400 ">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path v-if="!menuOpen" fill-rule="evenodd" clip-rule="evenodd"
              d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            <path v-else fill-rule="evenodd" clip-rule="evenodd"
              d="M4.414 4.586a2 2 0 0 1 2.828 0L12 9.172l4.758-4.758a2 2 0 1 1 2.828 2.828L14.828 12l4.758 4.758a2 2 0 1 1-2.828 2.828L12 14.828l-4.758 4.758a2 2 0 0 1-2.828-2.828L9.172 12 4.414 7.242a2 2 0 0 1 0-2.828z" />
          </svg>
        </button>
        <ul :class="!menuOpen ? 'hidden' : 'visible'"
          class="absolute right-0 z-10 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <li><router-link to="/" @click=toggleMenu
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100">อาหาร</router-link></li>
          <li><router-link to="/eve" @click=toggleMenu
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100">อีฟ</router-link></li>
          <li><router-link to="/nt" @click=toggleMenu
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100">เอ็นที</router-link></li>
          <li><router-link to="/three" @click=toggleMenu
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100">ทรี</router-link></li>
          <li><router-link to="/oat" @click=toggleMenu
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100">โอ๊ต</router-link></li>
          <li><a @click="handleLoginEvent" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">{{ isLoggedIn ?
            "ออกจากระบบ" : "เข้าสู่ระบบ" }}</a></li>
        </ul>
      </div>
    </div>
  </div>
  <LoginOverlay v-if="showLoginOverlay" @close="toggleLoginOverlay" @login=handleLoginEvent></LoginOverlay>
</template>
