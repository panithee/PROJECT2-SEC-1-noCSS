<script setup>
import { computed, ref, watch } from "vue";
import PersonMealCost from "./PersonMealCost.vue";

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
  return groupsOption.value.filter((groups) => groups.name === selectedGroup.value)[0]?.meals;
});
const membersOption = computed(() => {
  return groupsOption.value.filter((groups) => groups.name === selectedGroup.value)[0]?.members;
});
const selectedGroup = ref("");
const selectedMember = ref("");
const selectedMeal = ref("");

watch(
  () => selectedGroup.value,
  () => {
    selectedMember.value = "";
    selectedMeal.value = "";
  }
);
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


</script>

<template>
  <div class="flex justify-center">
    <div class="w-8/12 text-2xl left-40 top-24">ค่าใช้จ่ายต่อคน</div>
  </div>

  <div class="flex justify-center w-full mt-4">

    <div class="flex justify-center w-full">
      <div class="flex justify-start w-10/12 md:w-8/12 lg:w-6/12">
        <div class="flex w-8/12 gap-4">

          <div class="w-full">
            <div class="text-md">กลุ่ม</div>
            <select v-model="selectedGroup" class="w-full h-12 text-lg">
              <option value="">ทั้งหมด</option>
              <option v-for="(group, index) in groupsOption" :key="index">
                {{ group.name }}
              </option>
            </select>
          </div>

          <div class="w-full">
            <div class="text-md">มื้ออาหาร</div>
            <select v-model="selectedMeal" class="w-full h-12 text-lg">
              <option value="">ทั้งหมด</option>
              <option v-for="(meal, index) in mealsOption" :key="index">
                {{ meal.name }}
              </option>
            </select>
          </div>

          <div class="w-full">
            <div class="text-md">สมาชิก</div>
            <select v-model="selectedMember" class="w-full h-12 text-lg">
              <option value="">ทั้งหมด</option>
              <option v-for="(member, index) in membersOption" :key="index">
                {{ member.name }}
              </option>
            </select>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div v-for="group in memberListByMeal" class="flex flex-col w-full gap-6 px-8 mt-4 sm:px-16 md:px-32 lg:px-60 xl:px-70">
    <PersonMealCost :meal-of-person="group.meals" :member-in-group="group.members" :member-selected="selectedMember" />

  </div>
</template>

