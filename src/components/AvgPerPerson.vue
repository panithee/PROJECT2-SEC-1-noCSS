<script setup>
import { ref, computed, watch } from "vue";
// import DropDown from "./DropDown.vue";
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
  return props.userData;
});
const mealsOption = computed(() => {
  if (selectedGroup === "") {
    return [];
  }
  return groupsOption.value.filter(
    (groups) => groups.name === selectedGroup.value
  )[0]?.meals;
});
const membersOption = computed(() => {
  return groupsOption.value.filter(
    (groups) => groups.name === selectedGroup.value
  )[0]?.members;
});
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
              food.consumers.some(
                (consumer) => consumer.name === selectedMember.value
              )
            ),
          };
        }),
      };
    });
  }
  return filteredGroups;
});

const foodInMeal = ref([]);
// const findFoodinMeal = (memberListByMeal) => {
//   for (meal in memberListByMeal) {
//     for (foods in meal ){
//       for (food in foods){
//         for (f in food.foods){
//           foodInMeal.value.push(f.name)
//         }
//       }
//     }
//   }
// }
// const findFoodMeal = () => {
//   memberListByMeal.value.forEach((meal) => {
//     meal.foods.forEach((food) => {
//       foodInMeal.value.push(food.name);
//     });
//   });
// };
// findFoodMeal();
// console.log(foodInMeal);

// console.log(memberListByMeal.value);

// const foodListByMeal = (memberListByMeal) => { 
//   for(const meal in memberListByMeal){
//     console.log(`${meal}`);
//     for(const food of memberListByMeal[meal]){
//       console.log(`${food}`);
//     }
//   }
// }
// foodListByMeal;


const mealsEat = (consumersName = [], meals = []) => {
  const mealEat = meals.reduce((acc, meal) => {
    const filteredFoods = meal.foods.filter((food) =>
      food.consumers.some((consumer) => consumersName.includes(consumer.name))
    );

    if (filteredFoods.length > 0) {
      acc.push({ ...meal, foods: filteredFoods });
    }

    return acc;
  }, []);

  return mealEat;
};

const mealsCal = (consumersName = [], meals = []) => {
  const mealCal = meals.reduce((acc, meal) => {
    meal.foods.forEach((food) => {
      food.consumers.forEach((consumer) => {
        if (consumersName.includes(consumer.name)) {
          console.log(consumer.price);
          acc += Number(consumer.price);
        }
      });
    });
    return acc
  }, 0);

  return mealCal;
};

// Example usage:


// const demo = groupList.value.find(g => g.name === "test2").members
// demo.forEach(m => console.log(m.name))
</script>

<template>
  <button class="absolute text-xl top-18 left-14 text-slate-500 hover:text-black">
    Back
  </button>
  <div class="absolute text-2xl left-40 top-24">ค่าใช้จ่ายต่อคน</div>

  <div class="pl-64 mt-20 w-fit">
    <div class="grid grid-cols-3 gap-4">
      <!-- <DropDown
                                                                                                                                                                                                          :name-drop-down="'test'"
                                                                                                                                                                                                          :default-option="'all'"
                                                                                                                                                                                                          :selected-fn="selectedGroup"
                                                                                                                                                                                                          :data-option="groupsOption"
                                                                                                                                                                                                          @select="(select) => (selectedGroup = select)"
                                                                                                                                                                                                        ></DropDown
                                                                                                                                                                                                        > -->
      <!-- <div>Selected: {{ selectedGroup }}</div> -->
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
    </div>
  </div>


  <div>
    <div v-for="group in memberListByMeal">
      {{ group.name }}
      <div v-for="member in group.members">
        {{ member.name }}
        <p v-for="meal in mealsEat(member.name, group.meals)">
          {{ meal.name }}
        <div v-for="food in meal.foods">
          {{ food.name }}
        </div>
        a{{ mealsCal(member.name, group.meals) }}
        </p>

      </div>
    </div>
  </div>

  <!-- <div class="flex justify-center w-full">
                                                                                                                                                                                              <div class="flex justify-center w-4/5 gap-2 py-3 border mt-7" v-for="meal in memberListByMeal">
      
                                                                                                                                                                                                <div class="flex flex-col justify-start w-4/5 gap-2 py-6 border px-9" >
                                                                                                                                                                                                  <div class="text-lg">{{ meal.members }}</div> -->
  <!-- <div class="text-lg" v-else v-for="">{{ selectedMember }}</div> -->

  <!-- <div class="flex-col justify-center gap-2" v-for="meal in memberListByMeal">
                                                                                                                                                                                                    <div v-for="foods in meal">
                                                                                                                                                                                                      <div v-for="food in foods">
                                                                                                                                                                                                        <div class="flex items-center justify-between px-3" v-for="f in food.foods">
                                                                                                                                                                                                          <span>{{ f.name }}</span>
                                                                                                                                                                                                          <span>Price</span>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      </div>

                                                                                                                                                                                                    </div>
                                                                                                                                                                                                  </div> -->

  <!-- <div class="text-lg">Total</div>

                                                                                                                                                                                                </div> -->

  <!-- <div class="flex flex-col justify-start w-4/5 gap-2 py-6 border px-9">
                                                                                                                                                                                                  <div class="text-lg" v-if="selectedMember !== null">{{ selectedMember }}</div>
       

                                                                                                                                                                                                  <div class="flex-col justify-center gap-2" v-for="meal in memberListByMeal">
                                                                                                                                                                                                    <div v-for="foods in meal">
                                                                                                                                                                                                      <div v-for="food in foods">
                                                                                                                                                                                                        <div class="flex items-center justify-between px-3" v-for="f in food.foods">
                                                                                                                                                                                                          <span>{{ f.name }}</span>
                                                                                                                                                                                                          <span>Price</span>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      </div>

                                                                                                                                                                                                    </div>
                                                                                                                                                                                                  </div>

                                                                                                                                                                                                  <div class="text-lg">Total</div>

                                                                                                                                                                                                </div> -->
  <!-- </div>
                                                                                                                                                                                            </div> -->
</template>
<style scoped></style>
