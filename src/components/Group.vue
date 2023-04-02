<script setup>
import { onBeforeMount, ref, watch } from "vue";
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

const emit = defineEmits(["updated"]);

watch(
  () => props.userData,
  (newVal) => {
    allGroupArr.value = newVal;
  }
);
onBeforeMount(() => {
  allGroupArr.value = props.userData;
});

const sumPrice = (group) => {
  if (group?.meals === undefined) return 0;
  console.log(group)
  return group.meals.reduce((sum, meal) => {
    let sumPrice = 0;
    meal.foods.forEach(food => {
      sumPrice += food.price
    });
    return sum + sumPrice;
  }, 0);

};
// show pop-up
const popup = ref(false);
const showInsertGroupPopUp = () => {
  textErrMember.value = "";
  textError.value = "";
  newMember.value = "";
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
        targetGroupForEdit.value = JSON.parse(
          JSON.stringify(allGroupArr.value[i])
        );
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
      textErrMember.value = "สมาชิกนี้มีอยู่แล้ว";
    }
  }

  for (const member of membersInGroupTarget.value) {
    if (member.name === newMember.value) {
      memberExists = member.name;
      textErrMember.value = "สมาชิกนี้มีอยู่แล้ว";
    }
  }

  if (newMember.value === "") {
    textErrMember.value = "กรุณาเพิ่มสมาชิก";
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
  for (const group of allGroupArr.value) {
    if (group.name === newGroupName.value) {
      groupNameExists = group.name;
    }
  }
  if (modeTarget.value === "add") {
    if (newGroupName.value === "") {
      textError.value = "กรุณาใส่ชื่อกลุ่ม";
    } else if (newGroupName.value === groupNameExists) {
      textError.value = "ชื่อกลุ่มนี้มีอยู่แล้ว";
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
    if (newGroupName.value === groupNameExists && newGroupName.value !== targetGroupForEdit.value.name) {
      textError.value = "กรุณาใส่ชื่อกลุ่ม";
    } else if (newGroupName.value === "") {
      textError.value = "กรุณาใส่ชื่อกลุ่ม";
    } else {
      showEditMembers.value = true;
      let currentGroup = allGroupArr.value[targetGroupForEditIndex.value];
      currentGroup.name = newGroupName.value;
      currentGroup.members = membersInGroupTarget.value.concat(memberList.value);
      currentGroup.meals = targetGroupForEdit.value.meals;
      showInsertGroupPopUp();
    }
  }
  emit("updated", allGroupArr.value);
};

// show member toggle
const showGroupDetails = (index, display) => {
  if (display === "unshow") {
    showDetailsOfGroup.value.push(index);
  } else if (display === "show") {
    showDetailsOfGroup.value.splice(showDetailsOfGroup.value.indexOf(index), 1);
  }
};

// delete group and members
const deleteGroupAndMembers = (index, groupOrMember) => {
  if (groupOrMember === "group") {
    if (confirm("คุณต้องการลบข้อมูลกลุ่มใช่หรือไม่")) {
      allGroupArr.value.splice(index, 1);
    }
  } else if (groupOrMember === "member") {
    if (confirm("คุณต้องการลบสมาชิกใช่หรือไม่?")) {
      resetPriceWhenRemove(index);
      membersInGroupTarget.value.splice(index, 1);
    }
  } else if (groupOrMember === "newAddMember") {
    if (confirm("คุณต้องการลบสมาชิกใช่หรือไม่?")) {
      memberList.value.splice(index, 1);
    }
  }
  emit("updated", allGroupArr.value);
};

const resetPriceWhenRemove = (index) => {
  const { name: memberRemoveName } = membersInGroupTarget.value[index];
  console.log(
    typeof targetGroupForEdit.value.meals,
    (targetGroupForEdit.value.meals = targetGroupForEdit.value.meals.reduce(
      (acc, { name, foods }) => {
        acc = [
          ...acc,
          {
            name,
            foods: foods.map((food) => {
              if (food.consumers === []) {
                return food;
              }
              if (
                food.consumers.some(
                  (consumer) => consumer?.name === memberRemoveName
                )
              ) {
                const consumerData = food.consumers.find(
                  (consumer) => consumer.name === memberRemoveName
                );
                console.log("food in loop", food);
                let filteredConsumers = food.consumers.filter((consumer) => {
                  console.log(
                    "🚀 ~ file: Group.vue:181 ~ filteredConsumers ~ consumer:",
                    consumer
                  );
                  return consumer.name !== memberRemoveName;
                });

                if (food.splitMode === "equal") {
                  let modifyPriceConsumers = filteredConsumers.map(
                    (consumer) => ({
                      ...consumer,
                      price: (food.price / filteredConsumers.length).toFixed(2),
                    })
                  );
                  return {
                    ...food,
                    consumers:
                      filteredConsumers.length > 0 ? modifyPriceConsumers : [],
                  };
                } else if (food.splitMode === "percentage") {
                  console.log(
                    "filteredConsumers in percentage",
                    filteredConsumers
                  );
                  let modifyPriceConsumers = filteredConsumers.map(
                    (consumer, index) => {
                      if (index === 0) {
                        console.log(consumerData);
                        console.log("consumer", consumer);
                        let newPercentage = Number(
                          consumerData.percentage + consumer.percentage
                        ).toFixed(2);
                        let newPrice = (
                          (food.price * newPercentage) /
                          100
                        ).toFixed(2);
                        return {
                          ...consumer,
                          price: Number(newPrice),
                          percentage: Number(newPercentage),
                        };
                      }
                      return consumer;
                    }
                  );
                  return {
                    ...food,
                    consumers:
                      filteredConsumers.length > 0 ? modifyPriceConsumers : [],
                  };
                }
              } else {
                return food;
              }
            }),
          },
        ];
        return acc;
      },
      []
    ))
  );
};
</script>

<template>
  <div class="w-full text-2xl">
    <div class="text-center sm:grid sm:grid-cols-2 sm:pr-96">
      <h1>รายชื่อกลุ่ม</h1>
    </div>
    <div v-for="(group, index) in allGroupArr" key="index">
      <div>
        <div class="grid w-5/6 grid-cols-2 py-2 pl-5 m-auto mt-5 border border-black rounded-md sm:w-3/5 sm:pl-14">
          <p>{{ group.name }}</p>
          <button v-if="showDetailsOfGroup.includes(index)" :id="index" class="flex justify-end pr-5"
            @click="showGroupDetails(index, 'show')">
            <ArrowDown></ArrowDown>
          </button>
          <button v-else :id="index" class="flex justify-end pr-5" @click="showGroupDetails(index, 'unshow')">
            <ArrowUp></ArrowUp>
          </button>
        </div>
        <div v-if="showDetailsOfGroup.includes(index)"
          class="flex flex-col items-center w-5/6 gap-2 py-2 pr-2 m-auto border border-black rounded-md sm:w-3/5">
          <div class="flex flex-col items-start w-4/5 gap-2">
            <span class="py-2 text-xl">รายชื่อสมาชิก</span>
            <div :id="index" class="flex w-full gap-2 overflow-x-scroll flex-nowrap h-11">
              <span v-for="member in group.members" key="index" class="px-3 text-lg border border-black rounded-xl">
                {{ member.name }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5 text-xl text-center">
            <span>จำนวนคน: {{ group.members.length }}</span>
            <span>ราคาทั้งหมด: {{ sumPrice(group) }}</span>
          </div>
          <div class="flex flex-row justify-end w-full gap-2 pr-2 text-base">
            <button :id="index" class="border border-b-black border-x-white border-t-white"
              @click="eventAddEdit(index, 'edit')">
              แก้ไขกลุ่ม
            </button>
            <button :id="index" class="border border-b-black border-x-white border-t-white"
              @click="deleteGroupAndMembers(index, 'group')">
              ลบกลุ่ม
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <button class="px-8 py-3 text-white bg-black rounded-full" @click="eventAddEdit(index, 'add')">
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
          <input v-model="newGroupName" class="border border-b-black w-36 sm:w-64" placeholder="กรุณาใส่ชื่อกลุ่ม"
            type="text" />
          <Pen class="inline mx-3"></Pen>
          <span class="text-lg text-red-600"> {{ textError }}</span>
        </div>
        <div class="text-xl sm:mt-4 sm:ml-20">
          <p>รายชื่อสมาชิก</p>
        </div>
        <div class="w-full h-10 overflow-y-scroll sm:h-24">
          <div class="sm:ml-24">
            <div v-for="(member, index) in membersInGroupTarget" v-show="showEditMembers" key="index">
              <button @click="deleteGroupAndMembers(index, 'member')">
                <Delete></Delete>
              </button>
              <span class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">
                {{ member.name }} <br />
              </span>
            </div>
            <span v-for="(member, index) in memberList" key="index">
              <button v-show="showEditMembers" :id="index" @click="deleteGroupAndMembers(index, 'newAddMember')">
                <Delete></Delete>
              </button>
              <span class="px-3 mt-4 ml-3 text-xl border border-black rounded-full">
                {{ member.name }} </span><br v-show="showEditMembers" />
            </span>
          </div>
        </div>
        <div class="text-center sm:text-left">
          <input v-model="newMember" class="mt-4 text-lg border sm:ml-24 border-b-black"
            placeholder="+ ใส่ชื่อสมาชิกทีละคน" type="text" @keypress.enter="addMember" />
          <button class="px-2 text-xl text-black border border-black rounded-full" @click="addMember">
            เพิ่ม
          </button>
          <br />
          <span class="text-lg text-red-600 sm:ml-24">
            {{ textErrMember }}</span>
        </div>
        <div class="flex justify-center">
          <button class="px-5 py-3 mt-3 text-white bg-black rounded-full sm:mt-0" @click="DoneAddEditGroup">
            บันทึกกลุ่ม
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
