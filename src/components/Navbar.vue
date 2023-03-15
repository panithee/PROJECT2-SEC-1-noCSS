<script setup>
import { ref } from 'vue'
const loginStatus = ref(false);
const loginToggle = () => {
    loginStatus.value = !loginStatus.value;
}
</script>

<template>
    <div class="navbar bg-base-100 bg-white">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">NO CSS</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><a>Meal</a></li>
                <li><a>Group</a></li>
                <li><a @click="loginToggle">Sign {{ loginStatus ? "out" : "in" }}</a></li>
            </ul>
        </div>
    </div>
</template>