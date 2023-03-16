import React from 'react';
import { TamaguiProvider } from 'tamagui';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import config from './tamagui.config';

function App(): JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <HomeScreen />
    </TamaguiProvider>
  );
}

export default App;
