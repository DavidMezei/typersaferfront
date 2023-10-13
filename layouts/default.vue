<script setup>
import { ref } from "vue";

const styles = ref("flex flex-col h-screen items-end justify-end");
</script>

<template>
    <main>
      <NavigationBar />
        <div class="flex">
        <div class="w-1/6">
          <div :class="styles">
              <Kanye />
            </div>
        </div>
        <div class="w-4/6 flex flex-col items-center justify-center">
          <slot></slot>
        </div>
        <div class="w-1/6">
           <div :class="styles">
              <Chuck />
            </div>
        </div>
      </div>
    </main>
</template>

<style>
.page-left-enter-active,
.page-right-enter-active,
.page-left-leave-active,
.page-right-leave-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: all 1s linear;
}

.page-left-enter-from,
.page-right-leave-to {
    transform: translateX(100%);
}

.page-left-leave-to,
.page-right-enter-from {
    transform: translateX(-100%);
}

.page-left-enter-to,
.page-right-enter-to {
    transform: translateX(0);
}</style>
