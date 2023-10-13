<script setup>
const { data, refresh } = await useFetch(
    "https://api.chucknorris.io/jokes/random?category=dev"
);

const enableTyping = ref(false);

function startNewGame() {
      
       // multiPlayerStore.isNewGame = false;
        console.log(multiPlayerStore.isNewGame);
        setTimeout(() => {
            startMessage.value = "Ready?";
            setTimeout(() => {
                startMessage.value = "Steady!";
                setTimeout(() => {
                    startMessage.value = "Go!";
                    enableTyping.value = true;
                }, 1000);
            }, 1000);

        }, 1000);
    
}

onKeyStroke(true, async (e) => {
    if (e.key === " ") {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key === "b") {
        if (multiPlayerStore.isNewGame) {
            startNewGame();
        } else {
            prepareNewGame();
        }
        socket.notifyOtherPlayersToPrepareNewGame();
    } else {
        if (enableTyping.value) {
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
                            socket.sendCurrentPosition(correctlyTypedIndex.value, wpm.value);
                        }
                    } else {
                        if (caretIndex.value < textLetters.value.length) {
                            changeLetterStyleOnCurrentIndex(
                                letterMistakeStyle.value,
                                letterFocusStyle.value
                            );
                            mistakeCount.value++;
                            overallMistakeCount.value++;
                            multiPlayerStore.mistakes = mistakeCount.value;
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
        socket.sendCurrentPosition(correctlyTypedIndex.value, wpm.value);
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
const overallMistakeCount = ref(0);
const { startTimer, stopTimer } = useTimer();



async function gameFinished() {
    stopTimer();
    isRunning.value = false;
    const accuracy = (((correctlyTypedIndex.value - overallMistakeCount.value) / correctlyTypedIndex.value) * 100).toFixed(1);
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
    api.saveHistoryMultiplayer(historyItem);
    setTimeout(() => {
        socket.notifyOtherPlayersToUpdateLeaderboard();
    }, 1000);
}

async function prepareNewGame() {
    await refresh();
    socket.resetText(data.value.value);
    enableTyping.value = false;
    startMessage.value = "Wait for the game to start!";
    socket.getText();
    caretIndex.value = 0;
    correctlyTypedIndex.value = 0;
    mistakeCount.value = 0;
    styles.value = [];
    overallMistakeCount.value = 0;
    //multiPlayerStore.isNewGame = true;
    stopTimer();
    isRunning.value = false;
    multiPlayerStore.prepareNewGame = false;
    players.value.forEach((player) => {
        player.position = 0;
    });
    socket.sendCurrentPosition(correctlyTypedIndex.value, wpm.value);

}

function startGame() {
    if (!isRunning.value) {
        startTimer();
        isRunning.value = true;
        multiPlayerStore.isNewGame = false;
    }
}

function isBadKey(e) {
    return (
        e.key === "Shift" || e.key === "CapsLock" || e.key === "Control" || e.key === "Alt"
    );
}

function changeLetterStyleOnCurrentIndex(currentLetterStyle, nextLetterStyle) {
    styles.value[caretIndex.value] = currentLetterStyle;
    styles.value[caretIndex.value + 1] = nextLetterStyle;
}

const socket = useWebSocket();
const api = useApi();
const caretIndex = ref(0);
const correctlyTypedIndex = ref(0);
const mistakeCount = ref(0);
const isRunning = ref(false);
const styles = ref([]);
const letterFocusStyle = ref("bg-gray-700 text-gray-50");
const letterMistakeStyle = ref("bg-red-700 text-gray-50");
const letterCorrectStyle = ref("text-green-700");
const multiPlayerStore = useMultiPlayerStore();
const mainStore = useMainStore();
const wpm = computed(() => {
    return mainStore.wpm;
});
const isNewGame = computed(() => {
    return multiPlayerStore.isNewGame;
});

socket.connect();
socket.getText();

const players = computed(() => {
    return multiPlayerStore.players;
});

const textLetters = computed(() => {
    return multiPlayerStore.text ? multiPlayerStore.text.split("") : [];
});

const prepareNewGameStore = computed(() => {
    return multiPlayerStore.prepareNewGame;
});

watch(prepareNewGameStore, () => {
    if (prepareNewGameStore.value) {
       // prepareNewGame();
    }
});

const startMessage = ref("Wait for the game to start!");

watch(isNewGame, () => {
    if (isNewGame.value) {
        prepareNewGame();
    }
    else {
        startNewGame();
    }

});

let style2 = "font-bold text-red-700 flex items-center mb-10 text-center text-4xl";
const textSize = ref("")

style2 = computed(() => {
    return style2 + textSize.value;
});

</script>

<template>
    <div class="flex flex-col gap-10 items-center ease-in-out duration-1000 justify-center">
    <div >
        <p class="font-bold text-red-700 flex items-center mb-10 text-center text-4xl transition-all duration-500 ease-in-out transform" >
            {{ startMessage }}
        </p>
    </div>
        <div class="basis-1/4">
            <TrackWithPlayer v-for="player in players" 
            :correctly-typed-index="player.position" 
            :text-length="textLetters.length" 
            :player-name="player.name"
            :wpm="player.wpm" />
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
        <LeaderboardTable />
        </div>
    </div>
</template>
