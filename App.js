import React, { useEffect, useState } from 'react';
import Vocabs from './src/containers/vocabs/Index.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VocabDetailScreen from './src/containers/VocabDetailScreen/Index.js';
import {NativeBaseProvider, View} from 'native-base';
import HomeScreen from './src/containers/HomeScreen/Index.js';
import CreateVocabScreen from './src/containers/CreateVocabScreen/Index.js';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import PracticeScreen from './src/containers/PracticeScreen/Index.js';
const App = () => {
  const Stack = createNativeStackNavigator();
  const isLoading = useSelector(state => state.commons.isLoading);
  
  
//  function getLoading () {
//   if (isLoading) {
//     return (
      // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //   <ActivityIndicator size="large" />
      // </View>
//     );
//   } else {
//     return null
//   }
//  }

  return (
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
          options={{title: 'Từ đã thêm'}}
        />
        <Stack.Screen
          name="VocabDetail"
          component={VocabDetailScreen}
          options={{title: 'Vocab detail'}}
        />
        <Stack.Screen
          name="VocabCreate"
          component={CreateVocabScreen}
          options={{title: 'Tạo từ mới'}}
        />
        <Stack.Screen
          name="Practice"
          component={PracticeScreen}
          options={{title: 'Kiểm tra'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
 
  );
};

export default App;
