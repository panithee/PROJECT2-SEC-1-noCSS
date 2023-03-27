<script setup>
// import DropDown from './components/DropDown.vue'
import { ref, computed, watch } from "vue";
import DropDown from "./DropDown.vue";
const props = defineProps({
  userData: {
    type: Array,
    default: [],
  },
});
// const groupList = ref([
//   {
//     name: "fetchs",
//     members: [
//       {
//         id: 1,
//         name: "mo",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "eve",
//         price: 200,
//       },
//     ],

//     meals: [
//       {
//         id: 1,
//         name: "breakfast",
//         foods: [
//           {
//             id: 1,
//             name: "rice",
//             price: 100,
//             consumers: [
//               {
//                 id: 1,
//                 name: "mo",
//                 percentage: 100,
//               },
//             ],
//             split_mode: "equal",
//           },
//           {
//             id: 2,
//             name: "noodle",
//             price: 200,
//             consumers: [
//               {
//                 id: 1,
//                 name: "mo",
//                 percentage: 50,
//               },
//               {
//                 id: 2,
//                 name: "eve",
//                 percentage: 50,
//               },
//             ],
//             split_mode: "percentage",
//           },
//         ],
//       },
//       {
//         id: 2,
//         name: "hello",
//         foods: [
//           {
//             id: 1,
//             name: "rice",
//             price: 100,
//             consumers: [
//               {
//                 id: 1,
//                 name: "mo",
//                 percentage: 100,
//               },
//             ],
//             split_mode: "equal",
//           },
//           {
//             id: 2,
//             name: "noodle",
//             price: 200,
//             consumers: [
//               {
//                 id: 1,
//                 name: "mo",
//                 percentage: 50,
//               },
//               {
//                 id: 2,
//                 name: "eve",
//                 percentage: 50,
//               },
//             ],
//             split_mode: "percentage",
//           },
//         ],
//       }
//     ],
//   },
//   {
//     name: "test2",
//     members: [
//       {
//         id: 1,
//         name: "three",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "nt",
//         price: 200,
//       },
//       {
//         id: 3,
//         name: "nach",
//         price: 200,
//       },
//     ],
//     meals: [
//       {
//         id: 1,
//         name: "breakfast2",
//         foods: [
//           {
//             id: 1,
//             name: "rice",
//             price: 100,
//             consumers: [
//               {
//                 id: 1,
//                 percentage: 100,
//               },
//             ],
//             split_mode: "equal",
//           },
//           {
//             id: 2,
//             name: "noodle",
//             price: 200,
//             consumers: [
//               {
//                 id: 1,
//                 percentage: 50,
//               },
//               {
//                 id: 2,
//                 percentage: 50,
//               },
//             ],
//             split_mode: "percentage",
//           },
//         ],
//       },
//     ],
//   },
// ]);
const groupsOption = computed(() => {
  return props.userData
}
)
const mealsOption = computed(() => {
  if (selectedGroup === "") {
    return [];
  }
  return groupsOption.value.filter((groups) => groups.name === selectedGroup.value)[0]?.meals
}
)
const membersOption = computed(() => {
  return groupsOption.value.filter((groups) => groups.name === selectedGroup.value)[0]?.members
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
  let filteredGroups = props.userData;
  if (selectedGroup.value) {
    filteredGroups = filteredGroups.filter(
      (group) => group.name === selectedGroup.value
    );
  }
  if (selectedMeal.value) {
    filteredGroups = filteredGroups.map((group) => {
      return {
        ...group,
        meals: group.meals.filter((meal) => meal.name === selectedMeal.value),
      };
    });
  }
  if (selectedMember.value) {
    filteredGroups = filteredGroups.map((group) => {
      return {
        ...group,
        meals: group.meals.map((meal) => {
          return {
            ...meal,
            foods: meal.foods.filter((food) =>
              food.consumers.some((consumer) => consumer.name === selectedMember.value)
            ),
          };
        }),
      };
    });
  }
  return filteredGroups;
});





// const demo = groupList.value.find(g => g.name === "test2").members
// demo.forEach(m => console.log(m.name))





</script>

<template>
  {{ groupList }}
  <br>
  <br>
  g{{ selectedGroup }}
  <br>
  m{{ selectedMeal }}
  <br>
  mb{{ selectedMember }}

  <button class="absolute text-2xl top-20 left-14 text-slate-500 hover:text-black">
    Back
  </button>
  <div class="absolute text-3xl left-40 top-24">ค่าใช้จ่ายต่อคน</div>

  <div class="pl-64 mt-20 w-fit">
    <div class="grid grid-cols-3 gap-4">

      <div>Selected: {{ selectedGroup }}</div>
      <div>
        <div class="text-md">Group</div>
        <select class="w-32 h-12 text-lg border" v-model="selectedGroup">
          <option value="">all</option>
          <option v-for="(group, index) in groupsOption" :key="index">
            {{ group.name }}
          </option>
        </select>
      </div>


      <div>
        <div class="text-md">Meal</div>
        <select class="w-32 h-12 text-lg border" v-model="selectedMeal">
          <option value="">all</option>
          <option v-for="(meal, index) in mealsOption" :key="index">
            {{ meal.name }}
          </option>
        </select>
      </div>
      <div>
        <div class="text-md">Member</div>
        <select class="w-32 h-12 text-lg border" v-model="selectedMember">
          <option value="">all</option>
          <option v-for="(member, index) in membersOption" :key="index">
            {{ member.name }}
          </option>
        </select>
      </div>

      {{ memberListByMeal }}

      <!-- <div class="grid">
                                                                                                                                                                <span>Meal</span>
                                                                                                                                                                <div class="dropdown">
                                                                                                                                                                  <label tabindex="0" class="space-x-2 btn"
                                                                                                                                                                    ><span>Param</span>
                                                                                                                                                                    <div>
                                                                                                                                                                      <img
                                                                                                                                                                        class="w-4 h-4"
                                                                                                                                                                        src="./components/icons/DropDownArrow.svg"
                                                                                                                                                                        alt=""
                                                                                                                                                                      /></div
                                                                                                                                                                  ></label>
                                                                                                                                                                  <ul
                                                                                                                                                                    tabindex="0"
                                                                                                                                                                    class="w-32 p-2 shadow dropdown-content menu bg-base-100 rounded-box"
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
                                                                                                                                                                  <label tabindex="0" class="space-x-2 btn btn-outline no-animation"
                                                                                                                                                                    ><span>Param</span>
                                                                                                                                                                    <div>
                                                                                                                                                                      <img
                                                                                                                                                                        class="w-4 h-4"
                                                                                                                                                                        src="./components/icons/DropDownArrow.svg"
                                                                                                                                                                        alt=""
                                                                                                                                                                      />
                                                                                                                                                                    </div>
                                                                                                                                                                  </label>
                                                                                                                                                                  <ul
                                                                                                                                                                    tabindex="0"
                                                                                                                                                                    class="w-32 p-2 shadow dropdown-content menu bg-base-100 rounded-box"
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
