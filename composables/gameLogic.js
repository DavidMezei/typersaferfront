export function useGameLogic() {
  
  let data = ref(null);
  let refresh = ref(null);

  async function myFetch() {
    const response = await useFetch(
    "https://api.chucknorris.io/jokes/random?category=dev"
  );

    data = response.data;
    refresh = response.refresh;
  }

    myFetch();

  function handleKeyStroke() {
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
                changeLetterStyleOnCurrentIndex(
                  letterCorrectStyle.value,
                  letterFocusStyle.value
                );
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
  }

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

  async function gameFinished() {
    stopTimer();
    isRunning.value = false;
  }

  async function prepareNewGame() {
    await refresh();
    mainStore.text = data.value.value;
    caretIndex.value = 0;
    correctlyTypedIndex.value = 0;
    mistakeCount.value = 0;
    styles.value = [];
    mainStore.isNewGame = true;
    gameFinished();
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

  function changeLetterStyleOnCurrentIndex(
    currentLetterStyle,
    nextLetterStyle
  ) {
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

    return {
        caretIndex,
        correctlyTypedIndex,
        mistakeCount,
        isRunning,
        styles,
        letterFocusStyle,
        letterMistakeStyle,
        letterCorrectStyle,
        mainStore,
        textLetters,
        handleKeyStroke,
        prepareNewGame,
        startGame,
        gameFinished,
        isBadKey,
        typedCharIsCorrect,
        handleBackspace,
        deleteAsBackspace,
        changeLetterStyleOnCurrentIndex,
    };
}
