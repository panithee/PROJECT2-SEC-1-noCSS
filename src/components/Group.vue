<script setup>
import { ref, computed } from "vue";
const testArr = [{groupName: "Eve", member:["Eve","Mo","Nt"]},{groupName: "โมอายร้ายแรง", member:["Eve","Mo","Nt"]},{groupName: "นตขี้เหล้า", member:["Eve","Mo","Nt"]}];
const showGroupPopUp = ref(false);
const showInsertGroupPopUp = () => {
  showGroupPopUp.value = !showGroupPopUp.value;
  console.log(showGroupPopUp.value);
};

const inputGroupName = ref("")
const addGroup = () => {
        testArr.value?.push({
            groupName: inputGroupName.value
        })

        showInsertGroupPopUp()
    }


// if (modeTarget.value === "add") {
//       foodLists.value.push({
//         name: foodName.value,
//         price: price.value,
//         person: personFood.value,
//       });
//       foodName.value = "";
//       price.value = 0;
//       personFood.value = [];
//     } 
</script>

<template>
  <div class="w-full text-2xl">
    <div class="ml-16">
      <h1>รายชื่อกลุ่ม</h1>
    </div>
    <div>
      <div
        class="m-auto border border-black mt-5 rounded-md w-3/5 py-2 pl-14"
        v-for="group in testArr"
        key="index">
        <div class="grid grid-cols-2">
            <p>{{ group.groupName }}</p>
            <button class="flex justify-end pr-5"><img src="../icons/arrow-down.svg"></button>
        </div>
      </div>
    </div>
    <div class="text-center mt-5 bg-white">
      <button
        @click="showInsertGroupPopUp"
        class="rounded-full bg-black text-white px-8 py-3"
      >
        เพิ่มกลุ่ม
      </button>
    </div>

    <div
      v-show="showGroupPopUp"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="container absolute h-96 w-3/5 px-2 pt-2 rounded-lg bg-white">
        <div class="border border-black py-4 pl-5 rounded-lg">
            <input :v-model="inputGroupName" class="border border-b-black" type="text" placeholder="Add your group name">
        </div>
        <div class="text-xl ml-20 mt-4">
            <p>Member lists</p>
        </div>
        <div></div>
        <div>
            <input class="border border-b-black text-xl ml-24 mt-4" type="text" placeholder="+ Add a member">
            <button class="text-black border border-black text-xl rounded-full px-2">add</button>
        </div>
        <div class="text-center mt-10">
        <button @click="addGroup" class="bg-black px-6 py-5 text-white rounded-full">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
