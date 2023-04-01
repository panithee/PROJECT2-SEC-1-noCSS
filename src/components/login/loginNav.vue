<script setup>
import { computed } from "vue";

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
  <div class="tabs tabs-boxed bg-inherit">
    <a :class="loginBarStatus ? ' bg-blueEdit text-white' : 'bg-white'" class="w-1/2 text-black tab tab-lg tab-lifted "
      @click="$emit('login', true)">เข้าสู่ระบบ</a>
    <a :class="!loginBarStatus ? ' bg-blueEdit text-white' : 'bg-white'" class="w-1/2 text-black tab tab-lg tab-lifted "
      @click="$emit('login', false)">ลงทะเบียน</a>
  </div>
</template>

<style scoped></style>