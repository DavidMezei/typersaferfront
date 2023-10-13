<script setup>
const mainStore = useMainStore();

const historyItems = computed(() => {
  return mainStore.historyItems;
});

watch(historyItems, () => {
  //historyItems.value[0].ownStyle.value = " animate__animated animate__fadeInUp";
});

const style = [];

style.push(" animate__animated animate__fadeInUp");
</script>
<template>
  <div
    class="p-5 opacity-80 w-auto font-serif text-4xl mg-5 animate__animated animate__fadeInUp"
  >
    <div
      class="glass overflow-auto bg-gray-200 max-h-60 rounded-lg shadow hidden md:block w-full"
    >
      <table class="glass w-full overflow-hidden">
        <thead class="glass border-b-2 border-gray-300">
          <tr>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Date and time
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Accuracy
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Time
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Text length
                </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              WPM
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y font-semibold animate__animated animate__fadeInUp"
        >
          <tr v-for="(item, index) in historyItems" :class="style[index]">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ item.dateTime }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-xs  uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"
                >{{ item.accuracy }}</span
              >
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ item.time }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {{ item.textLength + " char" }}
                </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ item.wpm }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.glass {
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
