import { ref } from "vue";
import { useMainStore } from "../stores/MainStore.js";

export function useWPM(correctlyTypedIndex) {
  const wpm = ref(0);
  const mainStore = useMainStore();

  wpm.value = Math.round((correctlyTypedIndex.value / 5) / (mainStore.elapsedTime / 60));
  if (mainStore.elapsedTime === 0) {
    wpm.value = 0;
  }
  return { wpm }
}
