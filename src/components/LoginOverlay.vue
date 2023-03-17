<script setup>
import { eventBus } from '../eventbus.vue'
const closeLoginOverlay = () => {
    eventBus.$emit('closeLoginOverlay')
}
</script>
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
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
                <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                    <img src="https://pixabay.com/get/g1a085859e3eaccea8d29c7c676d9110f5735d2b6c31bfbb6ddd5bebaf27d528dfdf20992df428b0a4f77297131f201a84e797e2a0e45154bde8bd6cb5f6b4aed70b92118ac4d4971dcddddbb353ce8b7_1920.jpg"
                        class="w-full" alt="Food image" />
                </div>
                <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
                    <form>
                        <!-- Email input -->
                        <div class="max-w-md form-control basis-full">
                            <label class="label">
                                <span class="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="Type here" class="w-full input input-bordered " />
                            <label class="invisible label ">
                                <span class="label-text-alt">Error</span>
                            </label>
                        </div>
                        <!-- Password input -->
                        <div class="max-w-md form-control basis-full">
                            <label class="label ">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="Type here" class="w-full input input-bordered" />
                            <label class="invisible label ">
                                <span class="label-text-alt">Error</span>
                            </label>
                        </div>


                        <div class="flex items-center justify-between max-w-md mb-6 basis-full">

                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="w-full max-w-md btn"> Sign in</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-gray-900 {
    background-color: rgba(0, 0, 0, 0.5);
}
</style> -->
