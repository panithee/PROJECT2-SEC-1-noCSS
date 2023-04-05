<style scoped></style>

<script setup>
import {defineProps} from 'vue';

defineProps({
  memberInGroup: Array,
  mealOfPerson: Array,
  memberSelected: String
})
const mealsEat = (consumersName = [], meals = []) => {
  const mealEat = meals.reduce((acc, meal) => {
    const filteredFoods = meal.foods.filter((food) =>
        food.consumers.some((consumer) => consumersName.includes(consumer.name))
    );

    if (filteredFoods.length > 0) {
      acc.push({...meal, foods: filteredFoods});
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
}

</script>


<template>
  <!-- {{ memberInGroup }} -->
  <div v-for="(member, index) in memberInGroup" :key="index" class="flex flex-col gap-6">
    <div
        v-for="meal, index in mealsEat(member.name, mealOfPerson)" :key="index"
        v-if="memberSelected === ''"
        class="flex flex-col gap-2 px-8 py-4 text-xl backdrop-blur-3xl bg-gradient-to-r from-white/40 via-white/30 to-white/40 rounded-lg shadow-lg shadow-{AEAEC0}">

      <div>{{ member.name }}</div>

      <div class="flex justify-center">

        <div class="flex flex-col w-11/12 gap-1 text-base">
          <div v-for="food, index in meal.foods" :key="index">
            <div class="flex flex-row justify-between w-full border-b-[0.25px] border-b-black/40">
              <span>{{ food.name }}</span>
              <span>{{ food.consumers.find((consumer) => consumer.name === member.name).price }}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="text-lg">ราคามื้อ {{ mealCalGroup(member.name, meal) }} บาท</div>

    </div>

    <div
        v-for="meal in mealsEat(member.name, mealOfPerson)" 
        v-else-if="memberSelected === member.name"
        class="flex flex-col gap-2 px-8 py-4 text-xl backdrop-blur-3xl bg-gradient-to-r from-white/40 via-white/30 to-white/40 rounded-lg shadow-lg shadow-{AEAEC0}">
      <div>{{ memberSelected }}</div>

      <div class="flex justify-center">

        <div class="flex flex-col w-11/12 gap-1 text-base">
          <div v-for="food in meal.foods">
            <div class="flex flex-row justify-between w-full border-b-[0.25px] border-b-black/40">
              <span>{{ food.name }}</span>
              <span>{{ food.consumers.find((consumer) => consumer.name === memberSelected).price }}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="text-lg"> ราคามื้อ {{ mealCalGroup(member.name, meal) }} บาท</div>

    </div>

  </div>
</template>

<style scoped></style>
