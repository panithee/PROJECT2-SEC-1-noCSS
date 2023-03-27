<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import ArrowDown from "./icons/arrowDown.vue";
import ArrowUp from "./icons/arrowUp.vue";
import Close from "./icons/close.vue";
import Pen from "./icons/pen.vue";
import Delete from "./icons/Delete.vue";
const myGroupArr = ref([]);
const memberList = ref([]);
const checkInputMember = ref(false);
const textErrMember = ref("");
const textError = ref("");
//Edit
const successEditMembers = ref([]);
const showEditMembers = ref(false);
const memberToShow = ref([]);
const modeTarget = ref("");

const props = defineProps({
  userData: {
    type: Array,
    required: true,
  },
});

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
const popup = ref(false);
const showInsertGroupPopUp = () => {
  textErrMember.value = "";
  textError.value = "";
  memberList.value = [];
  // inputGroupName.value = "";
  // showEditMembers.value = false;
  popup.value = !popup.value;
};
const inputGroupName = ref("");
const inputMembers = ref("");

const DoneAddEditGroup = () => {
  let groupNameExists = "";
  if (modeTarget.value === "add") {
    for (const group of myGroupArr.value) {
      if (group.name === inputGroupName.value) {
        groupNameExists = group.name;
      }
    }
    if (inputGroupName.value === "") {
      textError.value = "Please add a group name";
    } else if (inputGroupName.value === groupNameExists) {
      textError.value = "Group name already exists";
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
  }
  if (modeTarget.value === "edit") {
    showEditMembers.value = true;
    let targetGroup = "";
    for (let i = 0; i < myGroupArr.value.length; i++) {
      if (i === index) {
        targetGroup = myGroupArr.value[i];
      }
    }
    inputGroupName.value = targetGroup.name;
    memberToShow.value = targetGroup.members;
    myGroupArr.value[index].name = inputGroupName.value;
    // myGroupArr.value[index].members = successEditMembers.value;
    showInsertGroupPopUp();
  }
};

// add value

const eventAddEdit = (index, mode) => {
  if (mode === "add") {
    showEditMembers.value = false;
    modeTarget.value = "add";
    inputGroupName.value = "";
    memberList.value = [];
  }

  if (mode === "edit") {
    modeTarget.value = "edit";
    showEditMembers.value = true;
    for (let i = 0; i < myGroupArr.value.length; i++) {
      if (i === index) {
        let targetGroup = myGroupArr.value[i];
        inputGroupName.value = targetGroup.name;
        memberToShow.value = targetGroup.members;
        myGroupArr.value[index].name = inputGroupName.value;
      }
    }
  }
  showInsertGroupPopUp();
};

// addMember
const addMember = () => {
  let memberExists = "";
  for (const member of memberList.value) {
    if (member.name === inputMembers.value) {
      memberExists = member.name;
      textErrMember.value = "Member already exits";
      checkInputMember.value = true;
    }
  }

  if (inputMembers.value === "") {
    textErrMember.value = "Please add your member";
    checkInputMember.value = true;
  } else if (inputMembers.value !== "" && inputMembers.value !== memberExists) {
    textErrMember.value = "";
    memberList.value.push({
      name: inputMembers.value,
      price: 0,
    });
  }
  inputMembers.value = "";
};

const totalPrice = ref(0);
// show member
const grouptarget = ref([]);
const showGroupDetails = (index) => {
  grouptarget.value.push(index);
};
const unshowGroupDetails = (index) => {
  grouptarget.value.splice(grouptarget.value.indexOf(index), 1);
};

// delete group
const deleteGroupAndMembers = (index, groupOrMember) => {
  console.log(index);
  if (groupOrMember === "group") {
    myGroupArr.value.splice(index, 1);
  } else if (groupOrMember === "member") {
    // for (const iterator of myGroupArr.value) {

    //
    // }
    for (let i = 0; i < myGroupArr.value.length; i++) {
      let test = myGroupArr.value[i];
      for (let j = 0; j < test.members.length; j++) {
        if (i === index) {
          console.log(test.members[j]);
          // successEditMembers.value = myGroupArr.value[i].members.splice(index, 1);
          // console.log(successEditMembers.value);
        }
      }
      // console.log(myGroupArr.value);
      // console.log(myGroupArr.value[i].members);
    }

    for (const iterator of object) {
      
    }
  }
};
</script>

<template>
  <div class="w-full text-2xl">
    <div class="ml-16">
      <h1>รายชื่อกลุ่ม</h1>
    </div>
    <div>
      <div v-for="(group, index) in myGroupArr" key="index">
        <div
          class="grid w-3/5 grid-cols-2 py-2 m-auto mt-5 border border-black rounded-md pl-14"
        >
          <p>{{ group.name }}</p>
          <button
            :id="index"
            v-if="grouptarget.includes(index)"
            @click="unshowGroupDetails(index)"
            class="flex justify-end pr-5"
          >
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
        <div
          class="w-3/5 py-2 m-auto border border-black rounded-md"
          v-if="grouptarget.includes(index)"
        >
          <p class="py-2 text-xl pl-14">Member Lists</p>
          <div :id="index" class="pl-14">
            <span
              v-for="member in group.members"
              key="index"
              class="px-3 mt-4 ml-3 text-xl border border-black rounded-full"
              >{{ member.name }}
            </span>
          </div>
          <div class="grid grid-cols-2 text-xl text-center">
            <span class="">จำนวนคน: {{ group.members.length }}</span>
            <span class="">ราคาทั้งหมด: {{ totalPrice }}</span>
          </div>
          <div class="text-xl text-right">
            <button
              :id="index"
              @click="eventAddEdit(index, 'edit')"
              class="mr-4 border border-b-black border-x-white border-t-white"
            >
              edit
            </button>
            <button
              :id="index"
              @click="deleteGroupAndMembers(index, 'group')"
              class="mr-5 border border-b-black border-x-white border-t-white"
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center bg-white">
      <button
        @click="eventAddEdit(index, 'add')"
        class="px-8 py-3 text-white bg-black rounded-full"
      >
        เพิ่มกลุ่ม
      </button>
    </div>

    <!-- pop-up -->
    <div
      v-show="popup"
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
          <span class="text-lg text-red-600"> {{ textError }}</span>
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
              <br v-show="showEditMembers" />
            </span>
            <div
              v-for="(member, index) in memberToShow"
              v-show="showEditMembers"
              key="index"
            >
              <button>
                <Delete
                  @click="deleteGroupAndMembers(index, 'member')"
                ></Delete>
              </button>
              <span
                class="px-3 mt-4 ml-3 text-xl border border-black rounded-full"
              >
                {{ member.name }} <br />
              </span>
            </div>
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
          <span class="ml-24 text-lg text-red-600"> {{ textErrMember }}</span>
        </div>
        <div class="flex justify-center mt-10">
          <button
            @click="DoneAddEditGroup"
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
