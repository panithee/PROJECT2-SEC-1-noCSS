<script setup>
import {onMounted, ref} from "vue";
import LoginOverlay from "./login/LoginOverlay.vue";

const isLoggedIn = ref(false);
isLoggedIn.value = sessionStorage.getItem("isLoggedIn") === "true";
const showLoginOverlay = ref(false);
const toggleLoginOverlay = () => {
  showLoginOverlay.value = !showLoginOverlay.value;
};
const emitEvents = defineEmits(["setUsername", 'clearData']);
const handleLoginEvent = (payload) => {
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
</script>

<template>
  <div class="navbar bg-base-100 ">
    <div class="flex-1">
      <a class="text-xl normal-case btn btn-ghost">NO CSS</a>
    </div>
    <div class="flex-none">
      <ul class="px-1 menu menu-horizontal">
        <li>
          <router-link to="/">Meal</router-link>
        </li>
        <!--        <li>-->
        <!--          <router-link to="/groups">Group</router-link>-->
        <!--        </li>-->
        <li>
          <router-link to="/eve">eve</router-link>
        </li>
        <li>
          <router-link to="/nt">nt</router-link>
        </li>
        <li>
          <router-link to="/three">three</router-link>
        </li>
        <li>
          <router-link to="/oat">oat</router-link>
        </li>
        <li><a @click="handleLoginEvent">Sign {{ isLoggedIn ? "out" : "in" }}</a></li>
      </ul>
    </div>
  </div>
  <LoginOverlay v-if="showLoginOverlay" @close="toggleLoginOverlay" @login=handleLoginEvent></LoginOverlay>
</template>