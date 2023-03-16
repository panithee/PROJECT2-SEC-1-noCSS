<script setup>
import { ref, computed } from "vue"

const page = ref(true)

const switchMenu = (type) => {
  if (type === "equal") {
    page.value = true
  } else if (type === "percent") {
    page.value = false
  }
}

const personList = ref(["John", "Three", "Eve", "Mo"])


</script>

<template>
  <div class="w-screen h-screen bg-red-100">
    <div class="w-full h-full">
      <p class="flex text-3xl" @click="">Back</p>
      <p class="flex justify-center text-4xl pt-5">น้ำตก</p>
      <p class="flex justify-center text-lg mt-5 text-gray-600">Average by</p>
      <div class="flex justify-center">
        <img
          src="../assets/AkarIconsEqual.svg"
          class="mr-2 cursor-pointer"
          @click="switchMenu('equal')"
          :class="page === true ? 'fill-red-500' : 'fill-gray-700'"
        />
        <img
          src="../assets/MdiPercentCircleOutline.svg"
          class="cursor-pointer"
          @click="switchMenu('percent')"
          :class="page === false ? 'fill-black' : 'fill-gray-700'"
        />
      </div>

      <p class="flex justify-center text-lg text-gray-600 mt-5">Member</p>
      <div class="w-3/5 bg-white flex justify-center m-auto" v-for="person in personList" key="index">
        <p class="flex bg-red-500">{{ person }}</p>
      </div>

      <div class="flex w-1/2 bg-gray-300 justify-center mx-auto">
        <div v-if="page">
          <p class="flex">คนจ่าย</p>
          <p class="flex">ราคา</p>
        </div>
        <div v-if="!page">
          <p>คนจ่าย</p>
          <p>ราคา</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
