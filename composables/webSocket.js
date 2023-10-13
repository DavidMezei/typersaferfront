
import { Client } from "@stomp/stompjs";
import nuxtStorage from "nuxt-storage";

export function useWebSocket() {
  let stompClient = null;
  const multiPlayerStore = useMultiPlayerStore();
  const mainStore = useMainStore();

  function connect() {
    stompClient = new Client({
      brokerURL: "ws://localhost:8080/subscribe-socket",
      debug: (str) => {
        console.log(str);
      },
    });
    stompClient.activate();
    stompClient.onConnect = (frame) => {
      subscribeToGameTopic("/topic/game");
      subscribeToGameTopicSubList("/topic/subscribe-list");
      notifyPlayersThatNewPlayerJoined();
      subscribeToNewGameTopic("/topic/new-game");
      subscribeToLeaderboard("/topic/leaderboard");
      setTimeout(() => {
      notifyOtherPlayersToUpdateLeaderboard();
      }, 1000);
    };
  }

  function sendCurrentPosition(position, wpm2) {
    const data = { 
      position: position,
       email: nuxtStorage.localStorage.getData("email"),
       wpm: wpm2,
       };
    stompClient.publish({
      destination: "/socket/game", 
      body: JSON.stringify(data),
    });
  }

  function notifyPlayersThatNewPlayerJoined() {
    const data = {
      position: 0,
      email: nuxtStorage.localStorage.getData("email"),
    };
    stompClient.publish({
      destination: "/socket/subscribe-list",
      body: JSON.stringify(data),
    });
  }

  function notifyOtherPlayersToPrepareNewGame() {
    stompClient.publish({
      destination: "/socket/new-game", 
    });
  }

    function notifyOtherPlayersToUpdateLeaderboard() {
      stompClient.publish({
        destination: "/socket/leaderboard",
      });
    }

  function getText() {
    fetch("http://localhost:8080/text")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        multiPlayerStore.text = data.text;
        multiPlayerStore.playerId = data.ownId;
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }

  function resetText(text) {
    const data = { text: text };
    fetch("http://localhost:8080/reset-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

   const subscribeToLeaderboard = (destination) => {
     stompClient.subscribe(destination, (message) => {
      const response = JSON.parse(message.body);
       multiPlayerStore.leaderboard = response;
       console.log("Leaderboard updated" + response);
     });
   };

  const subscribeToGameTopic = (destination) => {
    const data = {
      position: 0,
      email: nuxtStorage.localStorage.getData("email"),
    };
    stompClient.subscribe(destination, (message) => {
      const response = JSON.parse(message.body);
      multiPlayerStore.players = response;
    });
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(data),
    });
  };

  const subscribeToGameTopicSubList = (destination) => {
    const data = {
      position: 0,
      email: nuxtStorage.localStorage.getData("email"),
    };
    stompClient.subscribe(destination, (message) => {
      const response = JSON.parse(message.body);
      multiPlayerStore.players = response;
     if ( Array.isArray(multiPlayerStore.players)) {
      multiPlayerStore.leaderboard = multiPlayerStore.leaderboard.filter(
        (playerInGame) => {
          // Check if the playerInGame's name exists in multiPlayerStore.players
          return multiPlayerStore.players.some(
            (player) => player.name === playerInGame.name
          );
        }
      );
     }
    });
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(data),
    });
  };

   const subscribeToNewGameTopic = (destination) => {
     stompClient.subscribe(destination, (message) => {
       multiPlayerStore.isNewGame = !multiPlayerStore.isNewGame;
     });
   };

  const unsubscribeFromTopic = (destination) => {
    stompClient.unsubscribe(destination);
  };

  onBeforeUnmount(() => {
    if (stompClient !== null){
    stompClient.deactivate();
    }
  });

  function unsubscribe() {
    unsubscribeFromTopic("/topic/game");
  }

  function disconnect() {
     if (stompClient !== null) {
       stompClient.deactivate();
     }
  }

  return {
    connect,
    disconnect,
    unsubscribe,
    sendCurrentPosition,
    getText,
    resetText,
    notifyOtherPlayersToPrepareNewGame,
    notifyOtherPlayersToUpdateLeaderboard,
  };
}
