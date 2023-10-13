<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full test font-serif text-1xl ">
    <Disclosure
      as="nav"
      class="bg-gray-800 bg-opacity-90 nav2"
      v-slot="{ open }"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between animate__animated animate__fadeInDown">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-md"
                src="/apple-touch-icon.png"
                alt="Your Company"
              />
            </div>
            <div class="hidden md:block">
              <div class="flex mx-16 items-center space-x-4">
                <NuxtLink
                  v-for="item in navigation"
                  :to="item.href"
                  :key="item.name"
                  class="rounded-md px-3 py-2 font-medium text-gray-100 hover:bg-gray-700 hover:text-white"
                  >{{ item.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
             <NuxtLink to="/login" class="m-5 rounded-md px-3 py-2 font-medium text-gray-100 hover:bg-gray-700 hover:text-white">
                {{ signUpButtonName }}
                </NuxtLink>
              <button
                type="button"
                class="mr-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
             

              <div :key="name" class="rounded-md px-3 py-2 text-gray-100 hover:bg-gray-700 hover:text-white animate__animated animate__backInDown">
              Nice to see you {{ name }}!
              </div>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useMainStore } from "../stores/MainStore.js";
import { computed, reactive, ref, onMounted } from "vue";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl: "",
};

const mainStore = useMainStore();

import nuxtStorage from 'nuxt-storage';

if (process.client) {
  mainStore.name = nuxtStorage.localStorage.getData("name") ? nuxtStorage.localStorage.getData("name") : "Guest";
}



const name = computed(() => {
  return mainStore.name;
});


const navigation = reactive([
  { name: "Home", href: "/"},
  { name: "Party", href: "/party" },
  { name: "About", href: "/about" },
]);
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const signUpButtonName = computed(()=>{
  return mainStore.signUpButton;
});


</script>

<style scoped>
.nav2 {
  /*position: fixed;*/

  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  color: #fff;
  display: flex;
}

.router-link-exact-active {
  background-color: #021a16;
}

.router-link-exact-inactive:hover {
  background-color: #45ccb3;
}

/*'text-gray-100 hover:bg-gray-700 hover:text-white', */

.test {
  background: linear-gradient(to left bottom, #45ccb3, #6cdbeb);
}
</style>
