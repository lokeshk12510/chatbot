# React Bot Framework Web chat

Bot framework web chat with react customization

# Scripts

- Run `npm install` for install the required packages
- Then run `npm run dev`

# Packages

- botframework-webchat

# Generate token

- Provide the required bot token endpoint url
- After the token is received, `createDirectLine` function will create a `DirectLine`.
- `ReactWebChat` is a prebuild chat template, pass the directLine as props.

# Redux store creation

- To get the access to all the actions we need to create a redux store.
- For that `createStore` function is used.
- As a callback, store will trigger for action
- We can get those actions like sending message, receiving message.
- We can also add additional custom dispatch conditions here

# Custom Components

- With the help of the redux store, now we can dispatch prebuild and custom actions.
- Create any component, you can able to send or receive data using redux `store`.
- For example like input store its value in a state, after that you can pass the value to chatbox will the help of `store.dispatch()`
- If you need to get the response, you will get it in the action `payload` inside `createStore` callback.
