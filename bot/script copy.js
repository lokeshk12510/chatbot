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
  const res = await fetch(tokenEndpointUrl);
  const { token } = await res.json();

  store = window.WebChat.createStore({}, () => (next) => (action) => {
    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
      console.log(
        "When we receive DIRECT_LINE/CONNECT_FULFILLED action, we will send an event activity using WEB_CHAT/SEND_EVENT"
      );
      store.dispatch({
        type: "WEB_CHAT/SEND_EVENT",
        payload: {
          name: "webchat/join",
          value: { language: window.navigator.language },
        },
      });
    }
    console.log(action);
    return next(action);
  });

  const { ReactWebChat } = window.WebChat;

  window.ReactDOM.render(
    <ReactWebChat
      directLine={window.WebChat.createDirectLine({ token })}
      store={store}
    />,
    document.getElementById("webchat")
  );
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
