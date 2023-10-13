import { ref } from "vue";
import { useMainStore } from "../stores/MainStore.js";

export function useTimer() {
  const mainStore = useMainStore();
  let timer = ref(null);

  function startTimer() {
    if (!mainStore.isRunning) {
      mainStore.isRunning = true;
      mainStore.elapsedTime = 0;
      timer = setInterval(() => {
        mainStore.increaseElapsedTime();
      }, 1000);
    }
  }

  function stopTimer() {
    mainStore.isRunning = false;
    clearInterval(timer);
  }

  return {
    startTimer,
    stopTimer,
  };
}
