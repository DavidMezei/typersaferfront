import nuxtStorage from "nuxt-storage";

export function useApi() {
  const baseUrl =
    "https://Dwf-env.eba-gtp3f77z.eu-north-1.elasticbeanstalk.com/api";
  const mainStore = useMainStore();

  function isLoggedIn() {
    return nuxtStorage.localStorage.getData("email") !== null;
  }

  async function getUserName(email){
    const response = await fetch(baseUrl + "/user/name?email=" + email);
    const data = await response.text();
    return data;
  }

  async function getText() {
    if (!isLoggedIn()) {
      return;
    }
    const response = await fetch(baseUrl + "/text");
    const data = await response.json();
    return data;
  }

  async function resetText(text) {
    if (!isLoggedIn()) {
      return;
    }
    const data = { text: text };
    fetch(baseUrl + "/reset-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function getHistory(email) {
    if (!isLoggedIn()) {
      return;
    }
    email = nuxtStorage.localStorage.getData("email");
    const response = await fetch(baseUrl + "/history/" + email);
    const data = await response.json();
    mainStore.historyItems = data;
    return data;
  }

  async function saveHistory(history) {
    if (!isLoggedIn()) {
      return;
    }
    history.email = nuxtStorage.localStorage.getData("email");
    fetch(baseUrl + "/history/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(history),
    });
  }

  async function saveHistoryMultiplayer(history) {
    if (!isLoggedIn()) {
      return;
    }
    history.email = nuxtStorage.localStorage.getData("email");
    fetch(baseUrl + "/multi/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(history),
    });
  }

  async function saveUser(user) {
    fetch(baseUrl + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  return {
    getText,
    resetText,
    getHistory,
    saveHistory,
    saveUser,
    getUserName,
    saveHistoryMultiplayer,
  };
}
