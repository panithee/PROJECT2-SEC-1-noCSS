<script setup>
// import { eventBus } from '../eventbus.vue'
// const loginStatus = ref(false)
// const loginToggle = () => {
//     loginStatus.value = !loginStatus.value
// }
// eventBus.$on('closeLoginOverlay', () => {
//     loginStatus.value = false
// })
</script>

<template>
    <div class="navbar bg-base-100 ">
        <div class="flex-1">
            <a class="text-xl normal-case btn btn-ghost">NO CSS</a>
        </div>
        <div class="flex-none">
            <ul class="px-1 menu menu-horizontal">
                <li><a>Meal</a></li>
                <li><a>Group</a></li>
                <li><a @click="loginToggle">Sign {{ loginStatus ? "out" : "in" }}</a></li>
            </ul>
        </div>
    </div>
</template>