<script setup>
import { ref, watch, defineProps } from "vue";
import { useWPM } from "../composables/wpm.js";
import { useMainStore } from "../stores/MainStore.js";

const props = defineProps({
  correctlyTypedIndex: {
    type: Number,
    required: true,
  }
});

const wpm = ref(0);
const mainStore = useMainStore();

const isNewGame = computed(() => {
  return mainStore.isNewGame;
});

const elapsedTime = computed(() => {
  return mainStore.elapsedTime;
});

const value = computed(() => {
  return props.correctlyTypedIndex;
});

watch(elapsedTime, () => {
  wpm.value = useWPM(value).wpm.value;
  mainStore.wpm = wpm.value;
});

watch(isNewGame, () => {
  if (isNewGame.value) {
    wpm.value = 0;
  }
});

</script>

<template>
  <div
    class="text-center transition-transform duration-500 ease-in-out transform hover:scale-110 text-5xl font-bold text-blue-500 hover:text-red-500 m-5">
    <p class="transition-all duration-500 ease-in-out transform">{{ wpm }} WPM</p>
  </div>
</template>
