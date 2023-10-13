import 'animate.css';

<script setup>
const { data, refresh } = await useFetch("https://api.kanye.rest/");

const namen = ref("animate__animated animate__bounceIn");

const bool = ref(true);

const config = ref("top center");
const animationStarted = ref(false);
const buttonClass = ref("animate__animated animate__bounce");

setInterval(change, 10000);

function change() {
  refresh();
  bool.value = !bool.value;
  buttonClass.value = bool.value
    ? "animate__animated animate__fadeInUp"
    : "animate__animated animate__bounce";
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      class="bg-blue-300 rounded-lg p-2 shadow-xl text-center overflow-hidden m-3 opacity-100 ease-linear duration-700"
      :class="buttonClass"
    >
      <p
        class="text-gray-800 w-auto h-auto md:w-auto md:h-auto max-w-md font-medium font-serif"
      >
        "{{ data.quote }}"
      </p>
    </div>
    <div class="mx-auto ml-1 mr-1">
      <img id="imgo" src="/img/kanye.png" alt="Discover Nuxt 3" />
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
}

div {
}
</style>
