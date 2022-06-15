import React, { useEffect } from 'react';
import RootNavigator from './core/router';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import CodePush from 'react-native-code-push';
import PushNotification from 'react-native-push-notification';

import { persistor, store } from './data/store';
import { PersistGate } from 'redux-persist/integration/react';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'App-Channel',
      channelName: 'App Channel',
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
