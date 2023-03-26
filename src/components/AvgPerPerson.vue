<script setup>
// import DropDown from './components/DropDown.vue'
import { ref } from "vue";
const demoFood = ref([
  { foodname: "ส้มตำ", foodPrice: 79 },
  { foodname: "ลาบหมา", foodPrice: 99 },
  { foodname: "ลู่ควาย", foodPrice: 89 },
]);
const demoPerson1 = ref({ name: "EHereEve", foodList: demoFood });
const demoPerson2 = ref({ name: "panipani3", foodList: demoFood });
const demoGroupPerson1 = ref({groupName: 'Nahee', person: [demoPerson1, demoPerson2]});
const demoGroupList = ref([demoGroupPerson1])
const demoPersonMeal = [];
const demoMeal = ref([{ food: demoFood, personInMeal: demoPersonMeal }]);
console.log(demoGroupPerson1.value.person[0].value.name);
</script>

<template>
  <button
    class="absolute top-20 left-14 text-2xl text-slate-500 hover:text-black"
  >
    Back
  </button>
  <div class="absolute left-40 top-24 text-3xl">ค่าใช้จ่ายต่อคน</div>

  <div class="mt-20 pl-64 w-fit">
    <div class="grid grid-cols-3 gap-4">
      <!-- Demo DropDown -->
      <div class="grid">
        <span>Group</span>
        <div class="dropdown">
          <label tabindex="0" class="btn space-x-2"><span>Param</span><div><img class="h-4 w-4"  src="../assets/DropDownArrow.svg" alt=""></div></label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
            <li v-for="(group, index) in demoGroupList" :key="index">
            {{ group.value.groupName }}
          </li>
          </ul>
        </div>
      </div>

      <!-- <div class="grid">
        <span>Meal</span>
        <div class="dropdown">
          <label tabindex="0" class="btn space-x-2"><span>Param</span><div><img class="h-4 w-4"  src="../assets/DropDownArrow.svg" alt=""></div></label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div> -->

      <div class="grid">
        <span>Member</span>
        <div class="dropdown">
          <label tabindex="0" class="btn btn-outline no-animation space-x-2"><span>Param</span><div><img class="h-4 w-4"  src="../assets/DropDownArrow.svg" alt=""></div></label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
            <li v-for="person in demoGroupPerson1.person" >
            {{ person.value.name }}
          </li>
          </ul>
        </div>



    </div>
    </div>
  </div>

  <div></div>
</template>
<style scoped></style>
