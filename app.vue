<script setup>
import { ref } from "vue";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
