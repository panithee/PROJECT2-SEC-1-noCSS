<script setup>
import { ref, watch } from "vue";
const testArr = ref([]);

const memberList = ref([])
const props = defineProps({
  userData: {
    type: Array,
    required: true,
  }
});
const emit = defineEmits(['updateData'])
watch(() => props.userData, (newVal, oldVal) => {
  console.log('watch: ', newVal);
  testArr.value = newVal
});
// show pop-up
const showGroupPopUp = ref(false);
const showInsertGroupPopUp = (event) => {
  showGroupPopUp.value = !showGroupPopUp.value;
  console.log(showGroupPopUp.value);
};

// add value
const inputGroupName = ref("")
const inputMembers = ref("")
const addGroup = () => {
  testArr.value.push({
    name: inputGroupName.value,
    members: memberList.value,
    meals: []
  })
  inputGroupName.value = ""
  memberList.value = []
  console.log(testArr.value);
  emit('updateData', testArr.value);
  showInsertGroupPopUp()
}

const addMember = () => {
  memberList.value.push({
    "name": inputMembers.value,
    "price": 0,
  })
  inputMembers.value = ""
}

// show member   
const showMembers = ref(true);
const showMemberLists = () => {
  showMembers.value = !showMembers.value
  console.log(showMembers.value);
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
      <div v-for="(group, index) in testArr" key="index">
        <div class="grid w-3/5 grid-cols-2 py-2 m-auto mt-5 border border-black rounded-md pl-14">
          <p>{{ group.name }}</p>
          <button :id="index" v-if="showMembers" @click="showMemberLists" class="flex justify-end pr-5"><img
              src="../icons/arrow-down.svg"></button>
          <button :id="index" v-else="showMembers" @click="showMemberLists" class="flex justify-end pr-5"><img
              src="../icons/arrow-up.svg"></button>
        </div>
        <div v-show="showMembers" :id="index" class="w-3/5 py-2 m-auto border border-black rounded-md pl-14">
          <span v-for="member in group.members" class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">{{
            member.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center bg-white">
      <button @click="showInsertGroupPopUp" class="px-8 py-3 text-white bg-black rounded-full">
        เพิ่มกลุ่ม
      </button>
    </div>

    <!-- pop-up -->
    <div v-show="showGroupPopUp" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="container absolute w-3/5 px-2 pt-2 bg-white rounded-lg h-96">
        <div class="flex justify-end pb-4">
          <button @click="showInsertGroupPopUp"><img src="../icons/close.svg"></button>
        </div>
        <div class="w-5/6 py-4 pl-5 border border-black rounded-lg">
          <input v-model="inputGroupName" class="border border-b-black" type="text" placeholder="Add your group name">
        </div>
        <div class="mt-4 ml-20 text-xl">
          <p>Member lists</p>
        </div>
        <div></div>
        <div>
          <div class="ml-24">
            <span v-for="member in memberList" class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">{{
              member.name
            }}</span>
          </div>
          <input v-model="inputMembers" class="mt-4 ml-24 text-xl border border-b-black" type="text"
            placeholder="+ Add a member">
          <button @click="addMember" class="px-2 text-xl text-black border border-black rounded-full">add</button>
        </div>
        <div class="mt-10 text-center">
          <button @click="addGroup" class="px-6 py-5 text-white bg-black rounded-full">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
