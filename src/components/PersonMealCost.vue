<script setup>
import { defineProps } from 'vue';
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
      acc.push({ ...meal, foods: filteredFoods });
    }

    return acc;
  }, []);

  return mealEat;
};

const mealCalGroup = (consumersName = [], meal = {}) => {
  // const mealCal = meals.reduce((acc, meal) => {
  //   meal.foods.forEach((food) => {
  //     food.consumers.forEach((consumer) => {
  //       if (consumersName.includes(consumer.name)) {
  //         console.log(food.name, consumer.price);
  //         acc += Number(consumer.price);
  //       }
  //     });
  //   });
  //   return acc
  // }, 0);
  // return mealCal;
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
  {{ memberInGroup }}
  <div class="flex flex-col gap-4" v-for="member in memberInGroup">
    <div class="flex flex-col gap-2 px-8 py-4 text-xl border" v-if="memberSelected === ''"
      v-for="meal in mealsEat(member.name, mealOfPerson)">

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

    <div class="flex flex-col gap-2 px-8 py-4 text-xl border" v-else-if="memberSelected === member.name"
      v-for="meal in mealsEat(member.name, mealOfPerson)">
      <div>{{ memberSelected }}</div>

      <div class="flex justify-center">

        <div class="flex flex-col w-11/12 gap-1 text-base">
          <div v-for="food in meal.foods">
            <div class="flex flex-row justify-between w-full">
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