import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Platform, InteractionManager } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import Amplify from '@aws-amplify/core'

import productsReducer from "./store/reducers/products";
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import NavigationContainer from './navigation/NavigationContainer';
import config from './aws-exports';


Amplify.configure(config);


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'BettyAngela': require('./assets/fonts/BettyAngela-PersonalUse.otf')
  })
};

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;

if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
      const timerFix = {};
      const runTask = (id, fn, ttl, args) => {
          const waitingTime = ttl - Date.now();
          if (waitingTime <= 1) {
              InteractionManager.runAfterInteractions(() => {
                  if (!timerFix[id]) {
                      return;
                  }
                  delete timerFix[id];
                  fn(...args);
              });
              return;
          }
  
          const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
          timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
      };
  
      global.setTimeout = (fn, time, ...args) => {
          if (MAX_TIMER_DURATION_MS < time) {
              const ttl = Date.now() + time;
              const id = '_lt_' + Object.keys(timerFix).length;
              runTask(id, fn, ttl, args);
              return id;
          }
          return _setTimeout(fn, time, ...args);
      };
  
      global.clearTimeout = id => {
          if (typeof id === 'string' && id.startsWith('_lt_')) {
              _clearTimeout(timerFix[id]);
              delete timerFix[id];
              return;
          }
          _clearTimeout(id);
      };
  }

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true);
    }}/>
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
