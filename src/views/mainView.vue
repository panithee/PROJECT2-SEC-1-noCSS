<script setup>
import { ref } from 'vue';
import mealDetail from "../components/mealDetail.vue";
const g_name = ref("")
const g_list = ref({})
const showmenu = ref(false)
const props = defineProps({
  userData: {
    type: Array, default: []
  }
})
const mealChoose = ref({ data: {}, index: -1 });

const sw = (mode, meal, index) => {

  if (mode == 'add') {
    showmenu.value = !showmenu.value
  }
  if (mode == 'edit') {
    mealChoose.value.data = meal
    mealChoose.value.index = index
    showmenu.value = !showmenu.value

  }
}
const show = () => {
  if (g_name.value == "") {
    g_list.value = {}
  } else {
    g_list.value = (props.userData.find(e => e.name == g_name.value))
  }

}
const emit = defineEmits(['updated'])
const updatedMeals = (mealFood, mealName) => {

  if (mealChoose.value.index == -1) {
    if (g_list.value.meals.some((e => e.name == mealName))) {
      alert("มีชื่อรายการนี้อยู่แล้ว")
      return
    }
    g_list.value.meals.push({ name: mealName, foods: mealFood })
  } else {
    g_list.value.meals[mealChoose.value.index] = { name: mealName, foods: mealFood }
  }
  showmenu.value = !showmenu.value
  const userDataG = props.userData;
  const index = userDataG.findIndex(e => e.name == g_name.value)
  userDataG[index] = g_list.value
  emit('updated', userDataG)
}
const deleteMeal = (index) => {
  if (confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) {
    g_list.value.meals.splice(index, 1)
    const userDataG = props.userData;
    const index2 = userDataG.findIndex(e => e.name == g_name.value)
    userDataG[index2] = g_list.value
    emit('updated', userDataG)
  }
}
</script>
<template>
  <div className="mainView">
    <div v-show="showmenu == false" className=" h-screen m-[50px]">

      <span className=" text-[25px]">
        รายการมื้ออาหาร
      </span>
      <hr>


      <label className="sr-only" htmlFor="underline_select">Underline select</label>
      <select id="underline_select" v-model="g_name"
        class="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer text-xl rounded-lg hover:bg-blueEdit hover:text-white"
        @click="show">
        <option value="">กรุณาเลือกกลุ่ม</option>
        <option v-for="item2 in props.userData">{{ item2.name }}</option>

      </select>

      <div class="mt-5">
        <span class="text-2xl ">รายชื่อคนทั้งหมดในกลุ่ม</span>
        <ul class="flex mt-3">
          <li v-for="item in g_list.members" class="">
            <span class="px-2 mx-2 text-black bg-white border border-black rounded-lg "> {{
              item.name
            }}</span>


          </li>
        </ul>
        <br>

      </div>

      <div v-for="(meal, index) in g_list.meals">
        <div class="border border-black rounded-lg m-[20px]">
          <p class="m-[20px]"> {{ meal.name }}</p>


          <div v-for="(food, index) in meal.foods" class="m-[20px]">
            <li class="list-none "><span>{{ food.name }} </span> <span class="float-right">{{ food.price }}</span></li>
            <hr>
          </div>
          <button class="border border-black m-[20px] rounded-lg p-1 text-green-800 hover:bg-black hover:text-green-300"
            @click="sw('edit', meal, index)">แก้ไขรายการ</button>
          <button @click="deleteMeal(index)"
            class="p-1 text-red-600 border-red-600 hover:bg-white hover:rounded-xl hover:border ">ลบรายการ</button>
        </div>
      </div>
      <div class=" flex justify-center m-[20px] ">
        <button @click="sw('add')"
          class="p-2 bg-white rounded-lg shadow-md hover:bg-cyan-700 hover:text-white">เพิ่มมื้ออาหาร</button>
      </div>
    </div>

    <div v-show="showmenu == true">
      <meal-detail :mealData="mealChoose.data" :member="g_list.members" @back="showmenu = false"
        @updatedMeals="updatedMeals"></meal-detail>
    </div>
  </div>
</template>


<style scoped></style>