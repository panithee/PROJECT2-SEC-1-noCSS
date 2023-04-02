<script setup>
import { ref, computed, watch } from "vue";
// import DropDown from "./DropDown.vue";
// import PersonMealCost from "./PersonMealCost.vue";
const props = defineProps({
  userData: {
    type: Array,
    default: [],
  },
});
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

watch(() => selectedGroup.value, (newVal, oldVal) => {
  selectedMember.value = "";
  selectedMeal.value = "";
});
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

const mealCalGroup = (consumersName = [], meal = {}) => {
  const mealCal = meal.foods.reduce((acc, food) => {
    food.consumers.forEach((consumer) => {
      if (consumersName.includes(consumer.name)) {
        acc += Number(consumer.price)
      }
    })
    return acc
  }, 0)
  return mealCal
};

</script>

<template>
  <button class="absolute text-xl top-18 left-14 text-slate-500 hover:text-black">
    Back
  </button>
  <div class="absolute text-2xl left-40 top-24">ค่าใช้จ่ายต่อคน</div>

  <div class="flex justify-center w-full">
    <div class="flex justify-start w-7/12 mt-20">
      <div class="grid grid-cols-3 gap-4">
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

      </div>
    </div>
  </div>

  <div class="flex flex-col w-full gap-4 mt-8 px-28" v-for="group in memberListByMeal">

    <!-- <PersonMealCost test="group"/> -->

    <div class="flex flex-col gap-4" v-for="member in group.members">
      <div class="flex flex-col gap-2 px-8 py-4 text-xl border" v-if="selectedMember === ''"
        v-for="meal in mealsEat(member.name, group.meals)">

        <div>{{ member.name }}</div>

        <div class="flex justify-center">
          <div class="flex flex-col w-11/12 gap-1 text-base">
            <div v-for="food in meal.foods">
              <div class="flex flex-row justify-between w-full">
                <span>{{ food.name }}</span>
                <span>{{ food.consumers.find((consumer) => consumer.name === member.name).price }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="text-lg">ราคามื้อ {{ mealCalGroup(member.name, meal) }} บาท</div>

      </div>

      <div class="flex flex-col gap-2 px-8 py-4 text-xl border" v-else-if="selectedMember === member.name"
        v-for="meal in mealsEat(member.name, group.meals)">
        <div>{{ selectedMember }}</div>

        <div class="flex justify-center">
          <div class="flex flex-col w-11/12 gap-1 text-base">
            <div v-for="food in meal.foods">
              <div class="flex flex-row justify-between w-full">
                <span>{{ food.name }}</span>
                <span>{{ food.consumers.find((consumer) => consumer.name === selectedMember).price }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="text-lg">ราคามื้อ {{ mealCalGroup(member.name, meal) }} บาท</div>
      </div>

    </div>

  </div>
</template>
