import React from 'react';
import Vocabs from './src/containers/vocabs/Index.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VocabDetailScreen from './src/containers/VocabDetailScreen/Index.js';
import {NativeBaseProvider} from 'native-base';
import HomeScreen from './src/containers/HomeScreen/Index.js';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Vocabs"
            component={Vocabs}
            options={{title: 'Vocabs'}}
          />
          <Stack.Screen
            name="VocabDetail"
            component={VocabDetailScreen}
            options={{title: 'Vocab detail'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
