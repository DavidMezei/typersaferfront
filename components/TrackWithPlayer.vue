<script setup>
import { ref, onMounted } from "vue";
import { useWPM } from "../composables/wpm.js";

const props = defineProps({
  correctlyTypedIndex: {
    type: Number,
    required: true,
  },
  textLength: {
    type: Number,
    required: true,
  },
  playerName: {
    type: String,
    required: false,
    default: "",
  },
  wpm: {
    type: Number,
    required: false,
  },
});

const correctlyTypedIndex = computed(() => {
  return props.correctlyTypedIndex;
});

const donePercentage = ref(0);
donePercentage.value = (correctlyTypedIndex.value / props.textLength) * 100;

watch(correctlyTypedIndex, () => {
  donePercentage.value = (correctlyTypedIndex.value / props.textLength) * 100;
});

</script>

<template>
  <div class="flex justify-end">
    <div
      class="text-2xl font-bold text-gray-800 flex items-center m-auto text-center"
    >
      {{ playerName }}
    </div>
    <div class="container ease-in-out duration-1000 mx-3 my-1 rounded-full p-1">
      <div
        class="absolute-box ease-out duration-1000"
        :style="{ left: donePercentage - donePercentage * 0.1 + '%' }"
      >
        <img
          class="inline-block"
          ref="image"
          src="/img/kanye.png"
          alt="Moving Image"
        />
      </div>
    </div>
    <div class="text-center transition-transform duration-500 ease-in-out transform hover:scale-110 text-5xl font-bold text-blue-100 hover:text-red-500 m-5">
      {{ wpm }}
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 1000px;
  height: 90px;
  border: 3px solid #000;
}

.absolute-box {
  position: absolute;
  /* Set left to 50% */
  width: 100px;
  height: auto;

  margin: 0 auto;
  /* Center horizontally */
}
</style>
