/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {store} from './store';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

AppRegistry.registerComponent(
  appName,
  () => props =>
    (
      <Provider store={store}>
        <NativeBaseProvider>
          <App {...props} />
        </NativeBaseProvider>
      </Provider>
    ),
  () => App,
);
