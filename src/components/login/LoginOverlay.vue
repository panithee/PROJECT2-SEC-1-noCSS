<script setup>
import { ref } from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import LoginNav from "@/components/login/loginNav.vue";
import LoginRegisterInterface from "@/components/login/loginRegisterInterface.vue";

const emit = defineEmits(["login", "close"])
const loginEmit = (payload) => {
  emit("login", payload);
};
let loginRegister = ref(true);
const loginNavStatus = (status) => {
  loginRegister.value = status;
};
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center ">
    <div class="absolute inset-0 bg-gray-900 opacity-50 " @click="$emit('close')"></div>
    <div class="container absolute h-full bg-hero rounded-xl">
      <div class="justify-center ">
        <div class="w-full">
          <login-nav :login-nav="loginRegister" @login="loginNavStatus"></login-nav>
        </div>
        <div>
          <div class="absolute top-0 right-0 mt-4 mr-4 ">
            <button
              class="text-gray-500 bg-white rounded-full opacity-20 hover:text-gray-600 focus:outline-none focus:text-gray-600 "
              @click="$emit('close')">
              <close-icon />
            </button>
          </div>

          <login-register-interface :login-register="loginRegister ? 'login' : 'register'"
            @login="loginEmit"></login-register-interface>
        </div>

      </div>
    </div>
  </div>
</template>
