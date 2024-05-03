import { useMemo, useState } from "react";
import ReactWebChat, {
  createDirectLine,
  createStore,
} from "botframework-webchat";

// Bot token endpoint url
const tokenEndpointUrl =
  "https://default88af3584c7f642beb743fdb59237f4.b5.environment.api.powerplatform.com/powervirtualagents/botsbyschema/crb31_copilot2/directline/token?api-version=2022-03-01-preview";

const Bot = () => {
  const [token, setToken] = useState("");
  const [action, setAction] = useState([]);

  const [input, setInput] = useState("");

  const handleInput = (val) => {
    setInput(val);
  };

  const store = useMemo(
    () =>
      createStore({}, ({ dispatch }) => (next) => (action) => {
        // Add additional actions here
        if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
          dispatch({
            type: "WEB_CHAT/SEND_MESSAGE",
            payload: { text: "sample:backchannel" },
          });
        } else if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
          const { activity } = action.payload;
          setAction(activity?.suggestedActions?.actions || []);

          console.log(activity, "----- Act");
        }
        return next(action);
      }),
    []
  );

  useMemo(() => {
    async function getToken() {
      const res = await fetch(tokenEndpointUrl);
      const { token } = await res.json();
      setToken(token);
    }

    getToken();
  }, []);

  const directLine = useMemo(() => createDirectLine({ token }), [token]);

  const handleDispatch = () => {
    store.dispatch({
      type: "WEB_CHAT/SEND_MESSAGE", // This action is to send message
      payload: { text: input },
    });
  };

  const handleActionDispatch = (text) => {
    store.dispatch({
      type: "WEB_CHAT/SEND_MESSAGE", // This action is to send message
      payload: { text },
    });
  };

  return (
    <div className="bot">
      <h1>CHAT BOT</h1>
      <div className="inputContainer">
        <input
          className="input"
          onChange={(e) => handleInput(e.target.value)}
          value={input}
        />
        <button onClick={handleDispatch}>Submit</button>
      </div>
      <div className="container">
        <ReactWebChat directLine={directLine} store={store} />
        <div className="actions">
          <p>Suggested Actions</p>
          {action?.map((item, i) => {
            return (
              <button key={i} onClick={() => handleActionDispatch(item.value)}>
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bot;
