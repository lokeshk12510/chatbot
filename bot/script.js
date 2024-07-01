// Bot token endpoint url
const tokenEndpointUrl =
  "https://default88af3584c7f642beb743fdb59237f4.b5.environment.api.powerplatform.com/powervirtualagents/botsbyschema/crb31_copilot/directline/token?api-version=2022-03-01-preview";

// We are creating our own version of Redux store, which includes middleware and an optional initial state.
let store = null;

const handleInput = () => {
  let inputField = document.getElementById("input");
  store.dispatch({
    type: "WEB_CHAT/SEND_MESSAGE", // This action is to send message
    payload: { text: inputField.value },
  });
  inputField.value = "";
};

document.getElementById("submitBtn").addEventListener("click", () => {
  handleInput();
});

(async function () {
  // In this demo, we are using Direct Line token from MockBot.
  // Your client code must provide either a secret or a token to talk to your bot.
  // Tokens are more secure. To learn about the differences between secrets and tokens
  // and to understand the risks associated with using secrets, visit https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0

  const res = await fetch(tokenEndpointUrl);
  const { token } = await res.json();

  // We are using a customized store to add hooks to connect event
  store = window.WebChat.createStore(
    {},
    ({ dispatch }) =>
      (next) =>
      (action) => {
        if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
          // When we receive DIRECT_LINE/CONNECT_FULFILLED action, we will send an event activity using WEB_CHAT/SEND_EVENT
          dispatch({
            type: "WEB_CHAT/SEND_EVENT",
            payload: {
              name: "webchat/join",
              value: { language: window.navigator.language },
            },
          });
        }

        return next(action);
      }
  );

  window.WebChat.renderWebChat(
    {
      directLine: window.WebChat.createDirectLine({ token }),
      store,
    },
    document.getElementById("webchat")
  );

  document.querySelector("#webchat > *").focus();
})().catch((err) => console.error(err));

// chatbot
// eslint-disable-next-line no-undef
const chatbox = jQuery.noConflict();

chatbox(() => {
  chatbox(".chatbox-btn").click(() => {
    if (chatbox(".chatbox-btn").hasClass(".chatbox-open")) {
      chatbox(".chatbox-popup").fadeOut();
      chatbox(".chatbox-btn").removeClass(".chatbox-open");
    } else {
      chatbox(".chatbox-popup").fadeIn();
      chatbox(".chatbox-btn").addClass(".chatbox-open");
    }
  });

  chatbox(".chatbox-close").click(() => {
    chatbox(".chatbox-popup").fadeOut();
    chatbox(".chatbox-btn").removeClass(".chatbox-open");
  });
});
