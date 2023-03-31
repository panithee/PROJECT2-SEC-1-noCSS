<script setup>
import {computed, ref, watch} from "vue";
import {checkUsernameExists, loginUser, registerUser} from "@/composable/FetchFunctions";
import ErrorText from "@/components/login/ErrorText.vue";

const props = defineProps({
  loginRegister: {
    type: String,
    required: true
  }
});

const usernameInput = ref("");
const passwordInput = ref("");
const confirmPasswordInput = ref("");
const errorSubmit = ref("");
const emit = defineEmits(["login"]);
const errorRegisterUsername = computed(() => {
  if (props.loginRegister === "login") {
    return "";
  } else {
    if (usernameInput.value === "") {
      return "";
    } else if (alreadyUserExist.value) {
      return "Username already exists";
    } else {
      return "";
    }
  }
});
const errorRegisterPassword = computed(() => {
  if (props.loginRegister === "login") {
    return "";
  } else {
    if (passwordInput.value === "") {
      return "";
    } else {
      return "";
    }
  }
});
const errorRegisterConfirmPassword = computed(() => {
  if (props.loginRegister === "login") {
    return "";
  } else {
    if (confirmPasswordInput.value === "") {
      return "";
    } else if (checkConfirm.value) {
      return "";
    } else {
      return "Password not match";
    }
  }
});
const errorLoginUsername = ref("");
const errorLoginPassword = ref("");
watch(() => props.loginRegister, () => {
  usernameInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
});
const handleLoginResult = async () => {
  errorLoginUsername.value = "";
  errorLoginPassword.value = "";
  const authResult = await loginUser(usernameInput.value, passwordInput.value);
  if (authResult === "Not Exists") {
    errorLoginUsername.value = "Username not found";
  } else if (authResult === "failed to login") {
    errorLoginPassword.value = "Password not match";
  } else if (authResult.length > 0) {
    emit("login", {status: "login", data: authResult});
  } else {
    console.log("Unknown error");
  }
};

const handleRegister = async () => {
  if (usernameInput.value === "" || passwordInput.value === "" || confirmPasswordInput.value === "") {
    errorSubmit.value = "Please fill all fields";
  } else if (alreadyUserExist.value === false && checkConfirm.value === true) {
    try {
      const res = await registerUser(usernameInput.value, passwordInput.value);
      if (res !== "Error Cannot Register") {
        errorSubmit.value = "Register success";
        usernameInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
      } else {
        errorSubmit.value = "Register failed";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const alreadyUserExist = ref(true);
watch(() => usernameInput.value, async () => {
  if (usernameInput.value === "") {
    alreadyUserExist.value = true;
  } else {
    const res = await checkUsernameExists(usernameInput.value);
    alreadyUserExist.value = res === "Username Exists";
  }
});
const checkConfirm = computed(() => {
  return confirmPasswordInput.value === passwordInput.value;
});
</script>
<template>
  <div class="flex flex-wrap items-center justify-center pt-16">
    <!--  login-->
    <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
      <div class="max-w-md form-control basis-full">
        <div v-if="loginRegister === 'login' ">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input v-model="usernameInput" class="w-full input input-bordered " placeholder="Type here" type="text"/>
          <label class=" label">
            <ErrorText :error-name="errorLoginUsername"></ErrorText>
          </label>
          <label class="label ">
            <span class="label-text">Password</span>
          </label>
          <input v-model="passwordInput" class="w-full input input-bordered" placeholder="Type here" type="password"/>
          <label class=" label ">
            <error-text :error-name="errorLoginPassword"></error-text>
          </label>
          <button class="w-full max-w-md btn" @click="handleLoginResult">
            Sign In
          </button>
        </div>
        <div v-else>
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input v-model="usernameInput" class="w-full input input-bordered " placeholder="Type here" type="text"/>
          <label class=" label">
            <ErrorText :errorName="errorRegisterUsername"></ErrorText>
          </label>
          <div class="max-w-md form-control basis-full">
            <label class="label ">
              <span class="label-text">Password</span>
            </label>
            <input v-model="passwordInput" class="w-full input input-bordered" placeholder="Type here" type="password"/>
            <label class=" label ">
              <ErrorText :errorName="errorRegisterPassword"></ErrorText>
            </label>
          </div>
          <div class="max-w-md form-control basis-full">
            <label class="label ">
              <span class="label-text">Confirm Password</span>
            </label>
            <input v-model="confirmPasswordInput" class="w-full input input-bordered" placeholder="Type here"
                   type="password"/>
            <label class=" label">
              <ErrorText :errorName="errorRegisterConfirmPassword"></ErrorText>
            </label>
          </div>
          <div class="flex items-center justify-between max-w-md mb-6 basis-full"></div>
          <button class="w-full max-w-md btn" @click="handleRegister">
            Register
          </button>
          <label class=" label">
            <ErrorText :errorName="errorSubmit"></ErrorText>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped></style>