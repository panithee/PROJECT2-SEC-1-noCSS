<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
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
const emit = defineEmits(["updateData"]);
watch(
  () => props.userData,
  (newVal, oldVal) => {
    // console.log("watch: ", newVal);
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
  showGroupPopUp.value = !showGroupPopUp.value;
  // console.log(showGroupPopUp.value);
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
    inputGroupName.value = "";
    memberList.value = [];
    // console.log(myGroupArr.value);
    emit("updateData", myGroupArr.value);
    showInsertGroupPopUp();
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

const deleteGroup = (index) =>{
  myGroupArr.value.splice(index,1)
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
          <button
            :id="index" v-if="grouptarget.includes(index)"
            @click="unshowGroupDetails(index)"
            class="flex justify-end pr-5">
            
          <ArrowDown></ArrowDown>
          </button>
          <button
            :id="index"
            v-else
            @click="showGroupDetails(index)"
            class="flex justify-end pr-5"
          >
          <ArrowUp></ArrowUp>
          </button>
        </div>
        <div class="w-3/5 py-2 m-auto border border-black rounded-md" v-if="grouptarget.includes(index)">
          <p class="text-xl py-2 pl-14">Member Lists</p>
          <div :id="index" class="pl-14">
            <span
              v-for="member in group.members"
              key="index"
              class="px-3 mt-4 ml-3 text-xl border border-black rounded-full"
              >{{ member.name }}
            </span>
          </div>
          <div class="text-center text-xl grid grid-cols-2">
          <span class="">จำนวนคน: {{ group.members.length }}</span>
          <span class="">ราคาทั้งหมด: {{ totalPrice }}</span>
          </div>
          <div class="text-right text-xl ">
            <button :id = "index" class="mr-4 border border-b-black border-x-white border-t-white">edit</button>
            <button :id = "index" @click = "deleteGroup(index)" class="mr-5 border border-b-black border-x-white border-t-white">delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center bg-white">
      <button
        @click="showInsertGroupPopUp"
        class="px-8 py-3 text-white bg-black rounded-full"
      >
        เพิ่มกลุ่ม
      </button>
    </div>

    <!-- pop-up -->
    <div
      v-show="showGroupPopUp"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="container absolute w-3/5 px-2 pt-2 bg-white rounded-lg h-96">
        <div class="flex justify-end pb-4">
          <button @click="showInsertGroupPopUp">
            <Close></Close>
          </button>
        </div>
        <div class="w-5/6 py-4 pl-5 border border-black rounded-lg">
          <input
            v-model="inputGroupName"
            class="border border-b-black"
            type="text"
            placeholder="Add your group name"
          />
          <Pen class="inline mx-3"></Pen>
          <span class="text-lg text-red-600"> {{ errorGroupName }}</span>
        </div>
        <div class="mt-4 ml-20 text-xl">
          <p>Member lists</p>
        </div>
        <div>
          <div class="ml-24">
            <span
              v-for="member in memberList"
              class="px-3 mt-4 ml-3 text-xl border border-black rounded-full"
            >
              {{ member.name }}
            </span>
          </div>
          <input
            v-model="inputMembers"
            class="mt-4 ml-24 text-xl border border-b-black"
            type="text"
            placeholder="+ Add a member"
          />
          <button
            @click="addMember"
            class="px-2 text-xl text-black border border-black rounded-full"
          >
            add</button
          ><br />
          <span class="text-lg ml-24 text-red-600"> {{ errorMembers }}</span>
        </div>
        <div class="mt-10 flex justify-center">
          <button
            @click="addGroup"
            class="fixed px-6 py-5 text-white bg-black rounded-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
