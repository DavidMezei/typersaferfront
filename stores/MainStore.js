import { defineStore } from 'pinia'

export const useMainStore = defineStore("MainStore",{
    state: () => ({
        textLength: 0,
        wpm: 0,
        mistakes: 0,
        isRunning: false,
        isNewGame: true,
        resetGame: false,
        elapsedTime: 0,
        party: false,
        players: [],
        playerId: "",
        text: "Hello alma",
        pageNumber: 0,
        correctlyTypedIndex: 0,
        textLetters: [],
        historyItems: [],
        emailAsId: "",
        name: "",
        isLoggedIn: false,
        signUpButton: "Sign Up",
    }),
    getters: {
        doubleCount: (state) => state.count * 2
    },
    actions: {
        increaseElapsedTime() {
            this.elapsedTime++
        },
        setWPM(wpm) {
            this.wpm = wpm;
        }
    }
})
