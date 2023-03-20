<script setup>
import { onMounted, ref } from "vue";
import LoginOverlay from "./LoginOverlay.vue";



const loginStatus = ref(false);
if (sessionStorage.getItem("loginStatus") === "true") {
    loginStatus.value = true;
}
else {
    loginStatus.value = false;
}
const showLoginOverlay = ref(false);
const loginOverlayToggle = () => {
    console.log("loginOverlayToggle");
    showLoginOverlay.value = !showLoginOverlay.value;
};
const emit = defineEmits(["getUsername", 'clearData']);
const eventLogin = (payload) => {
    console.log("eventLogin");
    if (loginStatus.value) {
        console.log("logout");
        localStorage.clear;
        emit('clearData');
        loginStatus.value = false;
    }
    else if (payload.status === "login") {
        console.log("login");

        localStorage.setItem("loginStatus", "true");
        loginStatus.value = true;
        showLoginOverlay.value = false;
        emit("getUsername", payload.data)
    }
    else {
        loginOverlayToggle();
    }
};
onMounted(() => {
    console.log("Navbar mounted");
    if (localStorage.getItem("loginStatus") === "true" && localStorage.getItem("username") !== null) {
        loginStatus.value = true;
    }
});
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
                <li><a @click="eventLogin">Sign {{ loginStatus ? "out" : "in" }}</a></li>
            </ul>
        </div>
    </div>
    <LoginOverlay v-if="showLoginOverlay" @close="loginOverlayToggle" @login=eventLogin />
</template>