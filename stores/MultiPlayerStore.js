import { defineStore } from "pinia";

export const useMultiPlayerStore = defineStore("MultiPlayerStore", {
  state: () => ({
    textLength: 0,
    wpm: 0,
    mistakes: 0,
    isRunning: false,
    isNewGame: true,
    prepareNewGame: false,
    elapsedTime: 0,
    players: [],
    playerId: "",
    text: "",
    correctlyTypedIndex: 0,
    leaderboard: [],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
  },
});
