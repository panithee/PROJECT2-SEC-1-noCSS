<script setup>
import {computed} from "vue";

const props = defineProps({
  loginNav: {
    type: Boolean,
    required: true,
    default: true
  }
});
let loginBarStatus = computed(() => {
  return props.loginNav;
});

</script>
<template>
  <div class="tabs tabs-boxed">
    <a :class="loginBarStatus ? 'tab-active' : ''" class="w-1/2 tab tab-lg tab-lifted "
       @click="$emit('login', true)">Login</a>
    <a :class="!loginBarStatus ? 'tab-active' : ''" class="w-1/2 tab tab-lg tab-lifted "
       @click="$emit('login', false)">Register</a>
  </div>
</template>
<style scoped></style>