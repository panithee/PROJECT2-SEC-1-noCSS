<script setup>
import { computed, ref, watch } from "vue";
import { checkUsernameExists, loginUser, registerUser } from "@/composable/FetchFunctions";
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
      return "ชื่อผู้ใช้นี้มีอยู่แล้ว";
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
      return "รหัสผ่านไม่ตรงกัน";
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
    errorLoginUsername.value = "ไม่พบชื่อผู้ใช้";
  } else if (authResult === "failed to login") {
    errorLoginPassword.value = "รหัสผ่านไม่ถูกต้อง";
  } else if (authResult.length > 0) {
    emit("login", { status: "login", data: authResult });
  } else {
    console.log("Unknown error");
  }
};

const handleRegister = async () => {
  if (usernameInput.value === "" || passwordInput.value === "" || confirmPasswordInput.value === "") {
    errorSubmit.value = "กรุณากรอกข้อมูลให้ครบถ้วน";
  } else if (alreadyUserExist.value === false && checkConfirm.value === true) {
    try {
      const res = await registerUser(usernameInput.value, passwordInput.value);
      if (res !== "Error Cannot Register") {
        errorSubmit.value = "ลงทะเบียนสำเร็จ";
        usernameInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
      } else {
        errorSubmit.value = "ไม่สามารถลงทะเบียนได้";
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
      <div class="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div v-if="loginRegister === 'login'">
          <label class="label">
            <span class="label-text">ชื่อผู้ใช้</span>
          </label>
          <input v-model="usernameInput" class="w-full input input-bordered " placeholder="พิมพ์ที่นี่" type="text" />
          <label class="label ">
            <ErrorText :error-name="errorLoginUsername"></ErrorText>
          </label>
          <label class="label ">
            <span class="label-text">รหัสผ่าน</span>
          </label>
          <input v-model="passwordInput" class="w-full input input-bordered" placeholder="พิมพ์ที่นี่" type="password" />
          <label class="label ">
            <error-text :error-name="errorLoginPassword"></error-text>
          </label>
          <button class="w-full max-w-md mt-4 btn btn-primary" @click="handleLoginResult">
            เข้าสู่ระบบ
          </button>
        </div>
        <div v-else>
          <label class="label">
            <span class="label-text">ชื่อผู้ใช้</span>
          </label>
          <input v-model="usernameInput" class="w-full input input-bordered " placeholder="พิมพ์ที่นี่" type="text" />
          <label class="label ">
            <ErrorText :errorName="errorRegisterUsername"></ErrorText>
          </label>
          <div class="max-w-md form-control basis-full">
            <label class="label ">
              <span class="label-text">รหัสผ่าน</span>
            </label>
            <input v-model="passwordInput" class="w-full input input-bordered" placeholder="พิมพ์ที่นี่"
              type="password" />
            <label class="label ">

            </label>
          </div>
          <div class="max-w-md form-control basis-full">
            <label class="label ">
              <span class="label-text">ยืนยันรหัสผ่าน</span>
            </label>
            <input v-model="confirmPasswordInput" class="w-full input input-bordered" placeholder="พิมพ์ที่นี่"
              type="password" />
            <label class="label">
              <ErrorText :errorName="errorRegisterConfirmPassword"></ErrorText>
            </label>
          </div>
          <div class="flex items-center justify-between max-w-md mb-6 basis-full"></div>
          <button class="w-full max-w-md mt-4 btn btn-primary" @click="handleRegister">
            ลงทะเบียน
          </button>
          <label class="label">
            <ErrorText :errorName="errorSubmit"></ErrorText>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>


<style scoped>
/* empty */
</style>