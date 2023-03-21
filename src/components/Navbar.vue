<script setup>
import { onMounted, ref } from "vue";
import LoginOverlay from "./LoginOverlay.vue";
const isLoggedIn = ref(false);
if (sessionStorage.getItem("isLoggedIn") === "true") {
    isLoggedIn.value = true;
}
else {
    isLoggedIn.value = false;
}
const showLoginOverlay = ref(false);
const toggleLoginOverlay = () => {
    console.log("toggleLoginOverlay");
    showLoginOverlay.value = !showLoginOverlay.value;
};
const emitEvents = defineEmits(["getUsername", 'clearData']);
const handleLoginEvent = (payload) => {
    console.log("handleLoginEvent");
    if (isLoggedIn.value) {
        console.log("logout");
        sessionStorage.clear();
        emitEvents('clearData');
        isLoggedIn.value = false;
    }
    else if (payload.status === "login") {
        console.log("login");
        sessionStorage.setItem("isLoggedIn", "true");
        isLoggedIn.value = true;
        showLoginOverlay.value = false;
        console.log("payload.data: " + payload.data);
        emitEvents("getUsername", payload.data)
    }
    else {
        toggleLoginOverlay();
    }
};
onMounted(() => {
    console.log("Navbar mounted");
    if (sessionStorage.getItem("isLoggedIn") === "true" && sessionStorage.getItem("username") !== null) {
        isLoggedIn.value = true;
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
                <li><a @click="handleLoginEvent">Sign {{ isLoggedIn ? "out" : "in" }}</a></li>
            </ul>
        </div>
    </div>
    <LoginOverlay v-if="showLoginOverlay" @close="toggleLoginOverlay" @login=handleLoginEvent />
</template>