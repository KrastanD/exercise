import { NativeBaseProvider } from 'native-base';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <HomeScreen />
    </NativeBaseProvider>
  );
}

export default App;
