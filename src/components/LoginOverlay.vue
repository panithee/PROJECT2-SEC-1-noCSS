<script setup>
import { ref } from "vue";
import { userLogin } from "../composable/loginFunctions.js";
let username = ref("");
let password = ref("");
const emit = defineEmits(["close", "login"]);
const checkLoginResult = async (username, password) => {

    const result = await userLogin(username, password);
    if (result === "Error: 404") {
        alert("Wrong username ");
    }
    else if (result === "Error: 401") {
        alert("Wrong password");
    }
    else if (result != null) {
        console.log(result);
        emit("login", { status: "login", data: result });
    }
    else {
        alert("Unknown error");
    }

};
</script>
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-gray-900 opacity-50" @click="$emit('close')"></div>
        <div class="container absolute h-full px-6 py-24 bg-white">
            <div class="flex flex-wrap items-center justify-center h-full lg:justify-between">
                <!-- close button -->
                <div class="absolute top-0 right-0 mt-4 mr-4">
                    <button @click="$emit('close')"
                        class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
                    <!-- Email input -->
                    <div class="max-w-md form-control basis-full">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" class="w-full input input-bordered "
                            v-model="username" />
                        <label class="invisible label ">
                            <span class="label-text-alt">
                            </span>
                        </label>
                    </div>
                    <!-- Password input -->
                    <div class="max-w-md form-control basis-full">
                        <label class="label ">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="password" />
                        <label class="invisible label ">
                            <span class="label-text-alt">
                            </span>
                        </label>
                    </div>


                    <div class="flex items-center justify-between max-w-md mb-6 basis-full">

                    </div>

                    <!-- Submit button -->
                    <button class="w-full max-w-md btn" @click="checkLoginResult(username, password)"> Sign in</button>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-gray-900 {
    background-color: rgba(0, 0, 0, 0.5);
}
</style> 
