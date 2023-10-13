<script setup>
import { ref } from "vue";
import nuxtStorage from "nuxt-storage";

const mainStore = useMainStore();
const api = useApi();

const email = ref("");
const name = ref("");
const password = ref("");
const formKey = ref(0);
mainStore.signUpButton = "Sign Up"
const signUp = ref(mainStore.signUpButton);

async function saveSignUpDetails() {
  console.log("submitted")
  mainStore.emailAsId = email.value;
  if (name.value === "") {
    name.value = await api.getUserName(email.value);
  }
  mainStore.name = name.value;
  console.log("Store "+mainStore.name);
  nuxtStorage.localStorage.setData("email", email.value, 600);
  nuxtStorage.localStorage.setData("name", name.value, 600);
  mainStore.isLoggedIn = true;

  const user = {
    email: email.value,
    name: name.value,
    password: password.value,
  };
  if (!signUp) {
    api.saveUser(user);
  }
  //formKey.value++;
  email.value = "";
  name.value = "";
  password.value = "";
}

function switchToSignInPage(){
  signUp.value = false;
  mainStore.signUpButton = "Sign In";
}

function switchToSignUpPage() {
  signUp.value = true;
  mainStore.signUpButton = "Sign Up";
}

function signIn(){
  
}
</script>
<template>
  <div
    class="flex flex-1 font-serif text-black flex-col justify-center px-6 lg:px-8 glass text-gray-800 w-1/2 max-h-full mb-48 mt-36"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 v-if="!signUp" class="text-center text-2xl font-bold leading-9 tracking-tight">
        Sign in to your account
      </h2>
      <h2 v-if="signUp" class="text-center text-2xl font-bold leading-9 tracking-tight">
        New User? Sign Up Here
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        @submit.prevent="saveSignUpDetails"
        class="space-y-6"
        action="#"
        method="POST"
        :key="formKey"
      >
        <div v-if="signUp">
          <label for="name" class="block text-sm font-medium leading-6"
            >Name</label
          >
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              name="name"
              type="name"
              required="false"
              class="p-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required="false"
              class="p-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6"
              >Password</label
            >
            <div v-if="!signUp" class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-500 hover:text-indigo-600"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required="false"
              class="p-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div v-if="!signUp">
          <button
            type="submit"
            @click="signIn"
            class="flex w-full text-white justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
         <div v-if="signUp">
            <button
              type="submit"
              class="flex w-full text-white justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
          <div v-if="signUp" class="flex items-center mt-4">
            Already a Member?
            <div  class="text-sm">
              <a
                href="#"
                @click="switchToSignInPage"
                class="font-semibold text-indigo-600 hover:text-indigo-700 m-1"
                > Sign In</a
              >
            </div>
          </div>
           <div v-if="!signUp" class="flex items-center mt-4">
              New User?
              <div  class="text-sm">
                <a
                  href="#"
                  @click="switchToSignUpPage"
                  class="font-semibold text-indigo-600 hover:text-indigo-700 m-1"
                  > Sign Up</a
                >
              </div>
            </div>
          
      </form>
    </div>
  </div>
</template>

<style scoped>
.glass {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.3)
  );
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
