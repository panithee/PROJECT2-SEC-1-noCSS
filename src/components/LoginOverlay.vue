<script setup>
import { ref, defineEmits, computed, onBeforeUpdate } from "vue";
import { loginUser, checkUsernameExists, registerUser } from "../composable/loginFunctions.js";

const usernameInput = ref("");
const passwordInput = ref("");
const confirmPasswordInput = ref("");
const emit = defineEmits(["close", "login"]);
const errorLoginUsername = ref(false);
const errorLoginPassword = ref(false);
const handleLoginResult = async () => {
    errorLoginUsername.value = false;
    errorLoginPassword.value = false;
    const authResult = await loginUser(usernameInput.value, passwordInput.value);
    if (authResult === "Error: 404") {
        errorLoginUsername.value = true;
    } else if (authResult === "Error: 401") {
        errorLoginPassword.value = true;
    } else if (authResult.length > 0) {
        console.log(authResult);
        emit("login", { status: "login", data: authResult });
    } else {
        console.log("Unknown error");
    }
};
let loginRegister = ref("login");
const handleLoginRegister = (event, type) => {
    console.log(event.target);
    if (type === "login") {
        console.log(event.target.nextElementSibling);
        event.target.nextElementSibling.classList.remove("tab-active");
        loginRegister.value = "login";
    } else {
        console.log(event.target.previousElementSibling);
        event.target.previousElementSibling.classList.remove("tab-active");
        loginRegister.value = "register";
    }
    event.target.classList.add("tab-active");
};
const handleRegister = async (event) => {
    if (usernameInput.value === "" || passwordInput.value === "" || confirmPasswordInput.value === "") {
        console.log("Please fill all fields");
    }
    else if (alreadyUserExist.value === false && checkConfirm.value === true) {
        try {
            const res = await registerUser(usernameInput.value, passwordInput.value);
            if (res !== "Error Cannot Register") {
                console.log("Register success");
                passwordInput.value = "";
                loginRegister.value = "login";
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("handleRegister");
        console.log("alreadyUserExist :" + alreadyUserExist.value);
        console.log("checkConfirm :" + checkConfirm.value);
    }
}
const alreadyUserExist = ref(true);
const checkConfirm = computed(() => {
    return confirmPasswordInput.value === passwordInput.value;
});
onBeforeUpdate(async () => {
    if (loginRegister.value === "register") {
        console.log("onBeforeUpdate");
        alreadyUserExist.value = await checkUsernameExists(usernameInput.value)
        console.log("alreadyUserExist" + alreadyUserExist.value);
    }
})
</script>
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-gray-900 opacity-50" @click="$emit('close')"></div>
        <div class="container absolute h-full bg-white rounded-xl">
            <div class="justify-center ">
                <div class="justify-center tabs">
                    <a class="w-1/2 tab tab-lg tab-lifted tab-active "
                        @click="handleLoginRegister($event, 'login')">Login</a>
                    <a class="w-1/2 tab tab-lg tab-lifted " @click="handleLoginRegister($event, 'register')">Register</a>
                </div>
                <div>
                    <div class="absolute top-0 right-0 mt-4 mr-4 ">
                        <button @click="$emit('close')"
                            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
                            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center pt-16">

                <div class="md:w-8/12 lg:ml-6 lg:w-5/12" v-show="loginRegister === 'login'">
                    <div class="max-w-md form-control basis-full">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" class="w-full input input-bordered "
                            v-model="usernameInput" />
                        <label class=" label">
                            <span class="text-red-600 label-text-alt"
                                :class="errorLoginUsername ? 'inline-block' : 'invisible'">User not exist</span>
                        </label>
                    </div>
                    <div class="max-w-md form-control basis-full">
                        <label class="label ">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Type here" class="w-full input input-bordered"
                            v-model="passwordInput" />
                        <label class="invisible label ">
                            <span class="label-text-alt"></span>
                        </label>
                    </div>

                    <div class="flex items-center justify-between max-w-md mb-6 basis-full"></div>
                    <button class="w-full max-w-md btn" @click="handleLoginResult">
                        Sign In
                    </button>
                </div>
                <div class="md:w-8/12 lg:ml-6 lg:w-5/12" v-show="loginRegister === 'register'">
                    <div class="max-w-md form-control basis-full">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" class="w-full input input-bordered "
                            v-model="usernameInput" />
                        <label class=" label">
                            <span class="text-red-500 label-text-alt"
                                :class="alreadyUserExist ? 'inline-block' : 'invisible'">already
                                User Exist</span>
                        </label>
                    </div>
                    <div class="max-w-md form-control basis-full">
                        <label class="label ">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Type here" class="w-full input input-bordered"
                            v-model="passwordInput" />
                        <label class="invisible label ">
                            <span class="label-text-alt"></span>
                        </label>
                    </div>
                    <div class="max-w-md form-control basis-full">
                        <label class="label ">
                            <span class="label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Type here" class="w-full input input-bordered"
                            v-model="confirmPasswordInput" />
                        <label class=" label">
                            <span class="text-red-600 label-text-alt"
                                :class="checkConfirm ? 'invisible' : 'inline-block'">confirm Password not match</span>
                        </label>
                    </div>
                    <div class="flex items-center justify-between max-w-md mb-6 basis-full"></div>
                    <button class="w-full max-w-md btn" @click="handleRegister($event)">
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>