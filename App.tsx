import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      {Platform.OS === 'ios' ? (
        <SafeAreaView>
          <HomeScreen />
        </SafeAreaView>
      ) : (
        <HomeScreen />
      )}
    </NativeBaseProvider>
  );
}

export default App;
