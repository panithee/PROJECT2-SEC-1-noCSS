<script setup>
const dropDownDetail = {
    nameDropDown :'',
    type:'type',
    category :[]
}

</script>
 
<template>
      <div class="grid">
        <span>{{nameDropDown}}</span>
        <div class="dropdown">
          <label tabindex="0" class="btn space-x-2"
            ><span>{{type}}</span>
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
            v-for="(meals, index) in dropDownDetail.category"
            :key="index"
            
          >
            <li v-for="(meal, index) in meals.meals" :key="index">
              <a>{{ meal.name }}</a>
            </li>
          </ul>
        </div>
      </div>
</template>
 
<style scoped>

</style>