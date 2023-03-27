<script setup>
// import DropDown from './components/DropDown.vue'
import { ref, computed } from "vue";
import DropDown from "./DropDown.vue";

const groupList = ref([
  {
    name: "fetchs",
    members: [
      {
        id: 1,
        name: "mo",
        price: 100,
      },
      {
        id: 2,
        name: "eve",
        price: 200,
      },
    ],

    meals: [
      {
        id: 1,
        name: "breakfast",
        foods: [
          {
            id: 1,
            name: "rice",
            price: 100,
            consumers: [
              {
                id: 1,
                percentage: 100,
              },
            ],
            split_mode: "equal",
          },
          {
            id: 2,
            name: "noodle",
            price: 200,
            consumers: [
              {
                id: 1,
                percentage: 50,
              },
              {
                id: 2,
                percentage: 50,
              },
            ],
            split_mode: "percentage",
          },
        ],
      },
    ],
  },
  {
    name: "test2",
    members: [
      {
        id: 1,
        name: "three",
        price: 100,
      },
      {
        id: 2,
        name: "nt",
        price: 200,
      },
      {
        id: 3,
        name: "nach",
        price: 200,
      },
    ],
    meals: [
      {
        id: 1,
        name: "breakfast2",
        foods: [
          {
            id: 1,
            name: "rice",
            price: 100,
            consumers: [
              {
                id: 1,
                percentage: 100,
              },
            ],
            split_mode: "equal",
          },
          {
            id: 2,
            name: "noodle",
            price: 200,
            consumers: [
              {
                id: 1,
                percentage: 50,
              },
              {
                id: 2,
                percentage: 50,
              },
            ],
            split_mode: "percentage",
          },
        ],
      },
    ],
  },
]);
const groupsOption = computed(()=>{
  return groupList.value}
)
const mealsOption=computed(()=>{
  if(selectedGroup === "")
  {
    return [];
  }
  return groupsOption.value.filter((groups)=>groups.name === selectedGroup.value)[0]?.meals
}
)
const membersOption=computed(()=>{
  return groupsOption.value.filter((groups)=>groups.name === selectedGroup.value)[0]?.members
})
const selectedGroup = ref("");
const selectedMember = ref("");
const selectedMeal = ref("");

// const memberList = (selectedGroup) => {
//   return groupList.value.find(g => g.name === selectedGroup).members
// }

// const memberList = (selectedGroup) => groupList.value.find(g => g.name === selectedGroup).members

// const something = computed(() => { 
//   const ftGroup = groupList.value.filter(g => g.name === selectedGroup) //ได้ obj ตามชื่อ
//   ftGroup = ftGroup.value.filter(group => group.meals.filter(meal => meal.name == selectedMeal)) //ได้มื้ออาหารตามชื่อที่กด
//   ftGroup = ftGroup.value.filter(group => group.meals.filter(meal => meal.consumers.filter(person => person.name))) //ได้คนที่เลือก
//   return ftGroup
//  })

 const memberListByMeal = computed(() => { 
  const filterDatas = groupList.value
  if(selectedGroup.value === "" && selectedMeal.value ==="" && selectedMember ==="")
  {
    return []
  }
  if (selectedGroup.value !== "")
  {
    filterDatas = filterDatas.filter((groups)=>groups.name === selectedGroup.value)
  }
  if(selectedMeal.value !== "")
  {
    // filterDatas = filterDatas.filter((groups) =>)
  }
  const ftGroup = groupList.value.find(g => g.name === selectedGroup)
  const meals = ftGroup?.meals?.filter(meal => meal.name === selectedMeal)
  const consumers = meals?.flatMap(meal => meal.consumers)?.filter(person => person.name)
  return consumers
})




// const demo = groupList.value.find(g => g.name === "test2").members
// demo.forEach(m => console.log(m.name))





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

      <div>Selected: {{ selectedGroup }}</div>
      <div>
        <div class="text-md">Group</div>
        <select class="text-lg h-12 w-32 border" v-model="selectedGroup">
          <option value="">all</option>
          <option v-for="(group, index) in groupsOption" :key="index">
            {{ group.name}}
          </option>
        </select>
      </div>
      

      <div>
        <div class="text-md">Meal</div>
        <select 
          class="text-lg h-12 w-32 border" v-model="selectedMeal"
        >
          <option disabled value="">all</option>
          <option v-for="(meal, index) in mealsOption" :key="index">
            {{ meal.name }}
          </option>
        </select>
      </div>
      <div>
        <div class="text-md">Member</div>
        <select 
          class="text-lg h-12 w-32 border" v-model="selectedMember"
        >
          <option disabled value="">all</option>
          <option v-for="(member, index) in membersOption" :key="index">
            {{ member.name }}
          </option>
        </select>
      </div>

      {{ memberListByMeal }}

      <!-- <div class="grid">
        <span>Meal</span>
        <div class="dropdown">
          <label tabindex="0" class="btn space-x-2"
            ><span>Param</span>
            <div>
              <img
                class="h-4 w-4"
                src="./components/icons/DropDownArrow.svg"
                alt=""
              /></div
          ></label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
            v-for="(meals, index) in groupList"
            :key="index"
          >
            <li v-for="(meal, index) in meals.meals" :key="index">
              <a>{{ meal.name }}</a>
            </li>
          </ul>
        </div>
      </div> -->

      <!-- <div class="grid">
        <span>Member</span>
        <div class="dropdown">
          <label tabindex="0" class="btn btn-outline no-animation space-x-2"
            ><span>Param</span>
            <div>
              <img
                class="h-4 w-4"
                src="./components/icons/DropDownArrow.svg"
                alt=""
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
            v-for="(persons, index) in groupList"
            :key="index"
          >
            <li v-for="(person, index) in persons.members" :key="index">
              <a>{{ person.name }}</a>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>

  <div></div>
</template>
<style scoped></style>
