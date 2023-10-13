<script setup>
import { ref } from "vue";

const styles = ref("flex flex-col h-screen items-end justify-end");

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1
      class="font-serif text-6xl transition-all duration-500 ease-in-out transform hover:scale-105 mx-40 text-center pt-10">
      About Me</h1>
    <p
      class="font-serif text-4xl transition-all duration-500 ease-in-out transform hover:scale-105 mx-40 text-center pt-10">
      Hi, my name is David and I'm a developer. I love
      programming and building things with code.
    </p>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

main {
  /* background: linear-gradient(to right top, #45ccb3, #6cdbeb); */
  background: linear-gradient(to left bottom, #45ccb3, #6cdbeb);
}
</style>
