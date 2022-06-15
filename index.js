/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
