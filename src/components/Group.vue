<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import ArrowDown from "./icons/arrowDown.vue";
import ArrowUp from "./icons/arrowUp.vue";
import Close from "./icons/close.vue";
import Pen from "./icons/pen.vue";
import Delete from "./icons/Delete.vue";
const allGroupArr = ref([]);
const memberList = ref([]);
const textErrMember = ref("");
const textError = ref("");
const modeTarget = ref("");
const totalPrice = ref(0);

//Edit
const showEditMembers = ref(false);
const membersInGroupTarget = ref([]);
const targetGroupForEdit = ref([]);
const targetGroupForEditIndex = ref(-1);
const showDetailsOfGroup = ref([]);


const props = defineProps({
  userData: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['updated'])

watch(
  () => props.userData,
  (newVal, oldVal) => {
    allGroupArr.value = newVal;
  }
);
onBeforeMount(() => {
  allGroupArr.value = props.userData;
});

// show pop-up
const popup = ref(false);
const showInsertGroupPopUp = () => {
  textErrMember.value = "";
  textError.value = "";
  memberList.value = [];
  popup.value = !popup.value;
};

const newGroupName = ref("");
const newMember = ref("");


// set start value on popup
const eventAddEdit = (index, mode) => {
  if (mode === "add") {
    showEditMembers.value = false;
    modeTarget.value = "add";
    newGroupName.value = "";
    memberList.value = [];
  }

  if (mode === "edit") {
    modeTarget.value = "edit";
    showEditMembers.value = true;
    for (let i = 0; i < allGroupArr.value.length; i++) {
      if (i === index) {
        targetGroupForEditIndex.value = i;
        targetGroupForEdit.value = JSON.parse(JSON.stringify(allGroupArr.value[i]));
        newGroupName.value = targetGroupForEdit.value.name;
        membersInGroupTarget.value = targetGroupForEdit.value.members;
      }
    }
  }
  showInsertGroupPopUp();
};

// addMember
const addMember = () => {
  let memberExists = "";
  for (const member of memberList.value) {
    if (member.name === newMember.value) {
      memberExists = member.name;
      textErrMember.value = "Member already exits";
    }
  }

  for (const member of membersInGroupTarget.value) {
    if (member.name === newMember.value) {
      memberExists = member.name;
      textErrMember.value = "Member already exits";
    }
  }

  if (newMember.value === "") {
    textErrMember.value = "Please add your member";
    checkInputMember.value = true;
  } else if (newMember.value !== "" && newMember.value !== memberExists) {
    textErrMember.value = "";
    memberList.value.push({
      name: newMember.value,
      price: 0,
    });
  }
  newMember.value = "";
};

//Done (add value to allGroupArr)
const DoneAddEditGroup = () => {
  let groupNameExists = "";
  if (modeTarget.value === "add") {
    for (const group of allGroupArr.value) {
      if (group.name === newGroupName.value) {
        groupNameExists = group.name;
      }
    }
    if (newGroupName.value === "") {
      textError.value = "Please add a group name";
    } else if (newGroupName.value === groupNameExists) {
      textError.value = "Group name already exists";
    } else if (
      newGroupName.value !== "" &&
      newGroupName.value !== groupNameExists
    ) {
      allGroupArr.value.push({
        name: newGroupName.value,
        members: memberList.value,
        meals: [],
      });
      showInsertGroupPopUp();
      newGroupName.value = "";
      memberList.value = [];
    }
  }
  if (modeTarget.value === "edit") {
    showEditMembers.value = true;
    let currentGroup = allGroupArr.value[targetGroupForEditIndex.value];
    currentGroup.name = newGroupName.value;
    currentGroup.members = membersInGroupTarget.value.concat(memberList.value);
    showInsertGroupPopUp();
  }
  emit("updated", allGroupArr.value)
};

// show member toggle
const showGroupDetails = (index) => {
  showDetailsOfGroup.value.push(index);
};
const unshowGroupDetails = (index) => {
  showDetailsOfGroup.value.splice(showDetailsOfGroup.value.indexOf(index), 1);
};

// delete group and members
const deleteGroupAndMembers = (index, groupOrMember) => {
  if (groupOrMember === "group") {
    allGroupArr.value.splice(index, 1);
  } else if (groupOrMember === "member") {
    resetPriceWhenRemove(index);
    membersInGroupTarget.value.splice(index, 1);
  } else if (groupOrMember === "newAddMember") {
    memberList.value.splice(index, 1);
  }
  emit("updated", allGroupArr.value)
};
const resetPriceWhenRemove = (index) => {
  const { name: memberRemoveName } = membersInGroupTarget.value[index];

  targetGroupForEdit.value.meals = targetGroupForEdit.value.meals.reduce((acc, meal) => {
    acc.push({
      ...meal,
      foods: meal.foods.map((food) => {
        if (!food.consumers.includes(memberRemoveName)) {
          return food;
        }

        const { splitMode, consumers, price } = food;
        const removedConsumer = consumers.find((consumer) => consumer.name === memberRemoveName);
        const restPercentage = (removedConsumer.percentage / food.consumers.length - 1).toFixed(2);
        const scapePercentage = (removedConsumer - (restPercentage * food.consumers.length - 1)) + restPercentage;

        if (splitMode === "equal") {
          return {
            ...food,
            consumers: consumers.map((consumer) => {
              if (consumer.name === memberRemoveName) {
                return consumer;
              }

              const newPrice = (price / consumers.length - 1).toFixed(2);
              return {
                ...consumer,
                percentage: 0,
                price: newPrice,
              };
            }),
          };
        } else {
          return {
            ...food,
            consumers: consumers.map((consumer, index) => {
              if (consumer.name === memberRemoveName) {
                return consumer;
              }

              const newPercentage = (consumer.percentage + restPercentage).toFixed(2);
              const isLastConsumer = index === consumers.length - 1;
              const newConsumerPercentage = isLastConsumer ? scapePercentage : newPercentage;
              const newPrice = (newConsumerPercentage * price).toFixed(2);
              return {
                ...consumer,
                percentage: newConsumerPercentage,
                price: newPrice,
              };
            }),
          };
        }
      }),
    });

    return acc;
  }, []);
};


</script>

<template>
  <div class="w-full text-2xl">
    <div class="ml-16">
      <h1>รายชื่อกลุ่ม</h1>
    </div>
    <div>
      <div v-for="(group, index) in allGroupArr" key="index">
        <div class="grid w-3/5 grid-cols-2 py-2 m-auto mt-5 border border-black rounded-md pl-14">
          <p> {{ group.name }} </p>
          <button :id="index" v-if="showDetailsOfGroup.includes(index)" @click="unshowGroupDetails(index)"
            class="flex justify-end pr-5">
            <ArrowDown></ArrowDown>
          </button>
          <button :id="index" v-else @click="showGroupDetails(index)" class="flex justify-end pr-5">
            <ArrowUp></ArrowUp>
          </button>
        </div>
        <div class="flex flex-col items-center w-3/5 gap-2 py-2 pr-2 m-auto border border-black rounded-md"
          v-if="showDetailsOfGroup.includes(index)">
          <div class="flex flex-col items-start w-4/5 gap-2">
            <span class="py-2 text-xl">Member Lists</span>
            <div :id="index" class="flex w-full gap-2 overflow-x-scroll h-11 flex-nowrap">
              <span v-for="member in group.members" key="index" class="px-3 text-lg border border-black rounded-xl">
                {{ member.name }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 text-xl text-center">
            <span class="">จำนวนคน: {{ group.members.length }}</span>
            <span class="">ราคาทั้งหมด: {{ totalPrice }}</span>
          </div>
          <div class="flex flex-row justify-end w-full gap-2 pr-2 text-base">
            <button :id="index" @click="eventAddEdit(index, 'edit')"
              class="border border-b-black border-x-white border-t-white">
              edit
            </button>
            <button :id="index" @click="deleteGroupAndMembers(index, 'group')"
              class="border border-b-black border-x-white border-t-white">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center bg-white">
      <button @click="eventAddEdit(index, 'add')" class="px-8 py-3 text-white bg-black rounded-full">
        เพิ่มกลุ่ม
      </button>
    </div>

    <!-- pop-up -->
    <div v-show="popup" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="container absolute w-3/5 px-2 pt-2 bg-white rounded-lg h-96">
        <div class="flex justify-end">
          <button @click="showInsertGroupPopUp">
            <Close></Close>
          </button>
        </div>
        <div class="w-5/6 py-4 pl-5 border border-black rounded-lg">
          <input v-model="newGroupName" class="border border-b-black" type="text" placeholder="Add your group name" />
          <Pen class="inline mx-3"></Pen>
          <span class="text-lg text-red-600"> {{ textError }}</span>
        </div>
        <div class="mt-4 ml-20 text-xl">
          <p>Member lists</p>
        </div>
        <div class="w-full h-24 overflow-y-scroll">
          <div class="ml-24">
            <div v-for="(member, index) in membersInGroupTarget" key="index" v-show="showEditMembers">
              <button @click="deleteGroupAndMembers(index, 'member')">
                <Delete></Delete>
              </button>
              <span class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">
                {{ member.name }} <br />
              </span>
            </div>
            <span v-for="(member, index) in memberList" key="index">
              <button :id="index" @click="deleteGroupAndMembers(index, 'newAddMember')" v-show="showEditMembers">
                <Delete></Delete>
              </button>
              <span class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">
                {{ member.name }}
              </span><br v-show="showEditMembers" />
            </span>
          </div>
        </div>
        <div>
          <input v-model="newMember" class="mt-4 ml-24 text-xl border border-b-black" type="text"
            placeholder="+ Add a member" />
          <button @click="addMember" class="px-2 text-xl text-black border border-black rounded-full">
            add
          </button><br />
          <span class="ml-24 text-lg text-red-600"> {{ textErrMember }}</span>
        </div>
        <div class="flex justify-center">
          <button @click="DoneAddEditGroup" class="px-5 py-3 text-white bg-black rounded-full ">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
