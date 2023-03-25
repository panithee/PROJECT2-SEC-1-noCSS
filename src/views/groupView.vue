<script setup>
import { defineProps, ref, watch } from 'vue'
const props = defineProps({
    userData: {
        type: Array,
        required: true
    }
})
const datas = ref(props.userData);
watch(() => props.userData, (newVal, oldVal) => {
    console.log('watch: ' + newVal);
    datas.value = newVal;
})
</script>
 
<template>
    This my data
    <div v-for="(data) in datas">
        <h1 class="text-lg text-blue-800 ">{{ data.name }}</h1>
        <table class="table w-full border border-separate border-spacing-2 border-slate-500 table-compact ">

            <tbody>
                <tr v-for="(meals) in data.meals">
                    <td>{{ meals.name }}</td>
                    <td>
                        <li v-for="(food) in meals.foods">
                            <p>{{ food.name }}</p>
                            <p>{{ food.price }}</p>

                        <li v-for=" (consumer) in food.consumers">{{ consumer.id }}</li>
                        </li>
                    </td>

                </tr>
            </tbody>
        </table>
        <br>
    </div>
</template>
 
<style scoped></style>