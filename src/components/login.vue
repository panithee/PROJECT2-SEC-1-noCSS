<template>
    <div class="container h-full px-6 py-24">
        <div class="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                <img src="https://pixabay.com/get/g1a085859e3eaccea8d29c7c676d9110f5735d2b6c31bfbb6ddd5bebaf27d528dfdf20992df428b0a4f77297131f201a84e797e2a0e45154bde8bd6cb5f6b4aed70b92118ac4d4971dcddddbb353ce8b7_1920.jpg"
                    class="w-full" alt="Food image" />
            </div>
            <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
                <form>
                    <!-- Email input -->
                    <div class="form-control  basis-full max-w-md">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full " />
                        <label class="label invisible ">
                            <span class="label-text-alt">Error</span>
                        </label>
                    </div>
                    <!-- Password input -->
                    <div class="form-control basis-full max-w-md">
                        <label class="label ">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full" />
                        <label class="label invisible ">
                            <span class="label-text-alt">Error</span>
                        </label>
                    </div>


                    <div class="mb-6  items-center justify-between max-w-md flex basis-full">

                    </div>

                    <!-- Submit button -->
                    <button type="submit" class="btn w-full max-w-md"> Sign in</button>

                </form>
            </div>
        </div>
    </div>
</template>
<script>
</script>