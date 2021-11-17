/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import {Provider} from './context/LocationContext';
import useColorScheme from './hooks/useColorScheme';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colorScheme = useColorScheme();

  return (
    <Provider>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
