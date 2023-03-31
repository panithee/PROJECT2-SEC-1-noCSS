<script setup>
import { onBeforeMount, ref, watch } from "vue";
import ArrowDown from "./icons/arrowDown.vue";
import ArrowUp from "./icons/arrowUp.vue";
import Close from "./icons/close.vue";
import Pen from "./icons/pen.vue";

const myGroupArr = ref([]);
const memberList = ref([]);
const checkInputMember = ref(false);
const errorMembers = ref("");
const checkInputGroupName = ref(false);
const errorGroupName = ref("");

// console.log(myGroupArr.value);

const props = defineProps({
  userData: {
    type: Array,
    required: true,
  },
});

watch(
  () => props.userData,
  (newVal, oldVal) => {
    console.log("watch: ", newVal);
    myGroupArr.value = newVal;
  }
);
onBeforeMount(() => {
  myGroupArr.value = props.userData;
  // console.log("onBeforeMount: ", myGroupArr.value);
});

// show pop-up
const showGroupPopUp = ref(false);
const showInsertGroupPopUp = (event) => {
  errorMembers.value = "";
  errorGroupName.value = "";
  memberList.value = [];
  inputGroupName.value = ""
  showGroupPopUp.value = !showGroupPopUp.value;
  console.log(showGroupPopUp.value);
};

// add value
const inputGroupName = ref("");
const inputMembers = ref("");
const addGroup = () => {
  let groupNameExists = "";
  for (const group of myGroupArr.value) {
    if (group.name === inputGroupName.value) {
      groupNameExists = group.name;
    }
  }
  if (inputGroupName.value === "") {
    errorGroupName.value = "Please add a group name";
    checkInputGroupName.value = true;
  } else if (inputGroupName.value === groupNameExists) {
    errorGroupName.value = "Group name already exists";
    checkInputGroupName.value = true;
  } else if (
    inputGroupName.value !== "" &&
    inputGroupName.value !== groupNameExists
  ) {
    myGroupArr.value.push({
      name: inputGroupName.value,
      members: memberList.value,
      meals: [],
    });
    // emit("updateData", myGroupArr.value);
    showInsertGroupPopUp();
    inputGroupName.value = "";
    memberList.value = [];
    // console.log(myGroupArr.value);
  }
};

const addMember = () => {
  let memberExists = "";
  for (const member of memberList.value) {
    if (member.name === inputMembers.value) {
      memberExists = member.name;
      errorMembers.value = "Member already exits";
      checkInputMember.value = true;
    }
  }

  if (inputMembers.value === "") {
    errorMembers.value = "Please add your member";
    checkInputMember.value = true;
  } else if (inputMembers.value !== "" && inputMembers.value !== memberExists) {
    errorMembers.value = "";
    memberList.value.push({
      name: inputMembers.value,
      price: 0,
    });
  }
  inputMembers.value = "";
};

const totalPrice = ref(0)

// show member
const grouptarget = ref([]);
const showGroupDetails = (index) => {
  grouptarget.value.push(index);
  // console.log(grouptarget.value);
};
const unshowGroupDetails = (index) => {
  grouptarget.value.splice(grouptarget.value.indexOf(index), 1);
  // console.log(grouptarget.value);
};

const deleteGroup = (index) => {
  myGroupArr.value.splice(index, 1)
}

</script>

<template>
  <div class="w-full text-2xl">
    <div class="ml-16">
      <h1>รายชื่อกลุ่ม</h1>
    </div>
    <div>
      <div v-for="(group, index) in myGroupArr" key="index">
        <div class="grid w-3/5 grid-cols-2 py-2 m-auto mt-5 border border-black rounded-md pl-14">
          <p>{{ group.name }}</p>
          <button v-if="grouptarget.includes(index)" :id="index" class="flex justify-end pr-5"
            @click="unshowGroupDetails(index)">

            <ArrowDown></ArrowDown>
          </button>
          <button v-else :id="index" class="flex justify-end pr-5" @click="showGroupDetails(index)">
            <ArrowUp></ArrowUp>
          </button>
        </div>
        <div v-if="grouptarget.includes(index)" class="w-3/5 py-2 m-auto border border-black rounded-md">
          <p class="py-2 text-xl pl-14">Member Lists</p>
          <div :id="index" class="pl-14">
            <span v-for="member in group.members" key="index"
              class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">{{ member.name }}
            </span>
          </div>
          <div class="grid grid-cols-2 text-xl text-center">
            <span class="">จำนวนคน: {{ group.members.length }}</span>
            <span class="">ราคาทั้งหมด: {{ totalPrice }}</span>
          </div>
          <div class="text-xl text-right ">
            <button :id="index" class="mr-4 border border-b-black border-x-white border-t-white">edit</button>
            <button :id="index" class="mr-5 border border-b-black border-x-white border-t-white"
              @click="deleteGroup(index)">delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center bg-white">
      <button class="px-8 py-3 text-white bg-black rounded-full" @click="showInsertGroupPopUp">
        เพิ่มกลุ่ม
      </button>
    </div>

    <!-- pop-up -->
    <div v-show="showGroupPopUp" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="container absolute w-3/5 px-2 pt-2 bg-white rounded-lg h-96">
        <div class="flex justify-end pb-4">
          <button @click="showInsertGroupPopUp">
            <Close></Close>
          </button>
        </div>
        <div class="w-5/6 py-4 pl-5 border border-black rounded-lg">
          <input v-model="inputGroupName" class="border border-b-black" placeholder="Add your group name" type="text" />
          <Pen class="inline mx-3"></Pen>
          <span class="text-lg text-red-600"> {{ errorGroupName }}</span>
        </div>
        <div class="mt-4 ml-20 text-xl">
          <p>Member lists</p>
        </div>
        <div>
          <div class="ml-24">
            <span v-for="member in memberList" class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">
              {{ member.name }}
            </span>
          </div>
          <input v-model="inputMembers" class="mt-4 ml-24 text-xl border border-b-black" placeholder="+ Add a member"
            type="text" />
          <button class="px-2 text-xl text-black border border-black rounded-full" @click="addMember">
            add
          </button>
          <br />
          <span class="ml-24 text-lg text-red-600"> {{ errorMembers }}</span>
        </div>
        <div class="flex justify-center mt-10">
          <button class="fixed px-6 py-5 text-white bg-black rounded-full" @click="addGroup">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
