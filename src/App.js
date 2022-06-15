import React from 'react';
import RootNavigator from './core/router';
import { Provider } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
import CodePush from 'react-native-code-push';

import { persistor, store } from './data/store';
import { PersistGate } from 'redux-persist/integration/react';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 2000);
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
