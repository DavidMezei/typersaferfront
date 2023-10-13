<script setup>
const { data, refresh } = await useFetch(
  "https://api.chucknorris.io/jokes/random?category=dev"
);
onKeyStroke(true, async (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === "b") {
    prepareNewGame();
  } else {
    if (e.ctrlKey && e.key === "Backspace") {
      handleBackspace();
    } else {
      if (!isBadKey(e)) {
        if (e.key === "Backspace") {
          deleteAsBackspace();
        } else {
          if (typedCharIsCorrect(e)) {
            startGame();
            changeLetterStyleOnCurrentIndex(letterCorrectStyle.value, letterFocusStyle.value);
            if (mistakeCount.value === 0) {
              correctlyTypedIndex.value++;
            }
          } else {
            if (caretIndex.value < textLetters.value.length) {
              changeLetterStyleOnCurrentIndex(
                letterMistakeStyle.value,
                letterFocusStyle.value
              );
              mistakeCount.value++;
              overallMistakeCount.value++;
              mainStore.mistakes = mistakeCount.value;
            }
          }
          caretIndex.value++;
        }
        if (correctlyTypedIndex.value === textLetters.value.length) {
          gameFinished();
        }
        styles.value[caretIndex.value] += " rounded p-px";
      }
    }
  }
});

function typedCharIsCorrect(e) {
  return e.key === textLetters.value[caretIndex.value];
}

function handleBackspace() {
  if (
    textLetters.value[caretIndex.value - 1] === " " &&
    styles.value[caretIndex.value - 1] !== letterMistakeStyle.value
  ) {
    deleteAsBackspace();
  }
  while (
    (textLetters.value[caretIndex.value - 1] !== " " ||
      styles.value[caretIndex.value - 1] === letterMistakeStyle.value) &&
    caretIndex.value > 0
  ) {
    deleteAsBackspace();
  }
}

function deleteAsBackspace() {
  if (
    styles.value[caretIndex.value - 1] === letterCorrectStyle.value &&
    mistakeCount.value === 0
  ) {
    correctlyTypedIndex.value--;
  }
  if (styles.value[caretIndex.value - 1] === letterMistakeStyle.value) {
    mistakeCount.value--;
  }
  if (caretIndex.value > 0) {
    styles.value[caretIndex.value] = "";
    caretIndex.value--;
    styles.value[caretIndex.value] = letterFocusStyle.value;
  }
}

const { startTimer, stopTimer } = useTimer();

const historyItems = computed(() => {
  return mainStore.historyItems;
});

const overallMistakeCount = ref(0);

const api = useApi();

async function gameFinished() {
  stopTimer();
  isRunning.value = false;
  const accuracy = (((correctlyTypedIndex.value-overallMistakeCount.value)/correctlyTypedIndex.value)  * 100).toFixed(1) + "%";
  const time = mainStore.elapsedTime + " s";
  const wpm = mainStore.wpm;
  const dateTime = new Date().toLocaleString();
  const textLength = textLetters.value.length;
  const historyItem = {
    dateTime,
    accuracy,
    time,
    textLength,
    wpm,
  };
  mainStore.historyItems.unshift(historyItem);
  api.saveHistory(historyItem);
}

async function prepareNewGame() {
  await refresh();
  mainStore.text = data.value.value;
  caretIndex.value = 0;
  correctlyTypedIndex.value = 0;
  mistakeCount.value = 0;
  styles.value = [];
  overallMistakeCount.value = 0;
  mainStore.isNewGame = true;
   stopTimer();
  isRunning.value = false;
}

function startGame() {
  if (!isRunning.value) {
    startTimer();
    isRunning.value = true;
    mainStore.isNewGame = false;
  }
}

function isBadKey(e) {
  return (
    e.key === "Shift" ||
    e.key === "CapsLock" ||
    e.key === "Control" ||
    e.key === "Alt"
  );
}

function changeLetterStyleOnCurrentIndex(currentLetterStyle, nextLetterStyle) {
  styles.value[caretIndex.value] = currentLetterStyle;
  styles.value[caretIndex.value + 1] = nextLetterStyle;
}

const caretIndex = ref(0);
const correctlyTypedIndex = ref(0);
const mistakeCount = ref(0);
const isRunning = ref(false);
const styles = ref([]);
const letterFocusStyle = ref("bg-gray-700 text-gray-50");
const letterMistakeStyle = ref("bg-red-700 text-gray-50");
const letterCorrectStyle = ref("text-green-700");
const mainStore = useMainStore();

mainStore.text = ref(data.value.value);

const textLetters = computed(() => {
  return mainStore.text.split("");
});

mainStore.textLength = computed(() => {
  return textLetters.value.length;
});

onMounted(() => {
    api.getHistory(mainStore.emailAsId);
});



</script>

<template>
  <div class="flex flex-col gap-10 items-center ease-in-out duration-1000 justify-center">
    <div class="basis-1/4 mt-36">
      <TrackWithPlayer :correctly-typed-index="correctlyTypedIndex" :text-length="textLetters.length" />
    </div>
    <p
      class="font-serif text-4xl transition-all duration-500 ease-in-out transform hover:scale-105 mx-40 text-center basis-1/2 pt-10">
      <span :class="styles[index]" v-for="(letter, index) in textLetters" :key="index">
        {{ letter }}
      </span>
    </p>
    <div class="font-serif text-3xl mg-5 animate__animated animate__fadeInUp basis-1/4">
      <WPM :correctly-typed-index="correctlyTypedIndex" />
    </div>
    <div>
    <HistoryTable />
    </div>
  </div>
</template>
