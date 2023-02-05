/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddIcon,
  Button,
  Fab,
  Input,
  Modal,
  NativeBaseProvider,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

interface Exercise {
  name: string;
  count: number;
}

function App(): JSX.Element {
  const [exerciseList, setExerciseList] = useState<Exercise[]>([
    {name: 'test1', count: 1},
    {name: 'test2', count: 2},
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const getLocalList = async () => {
      const localList = await AsyncStorage.getItem('exerciseList');
      if (localList) {
        setExerciseList(JSON.parse(localList) as Exercise[]);
      }
    };
    getLocalList();
  }, []);

  const setLocalList = async (updatedList: Exercise[]) => {
    setExerciseList(updatedList);
    await AsyncStorage.setItem('exerciseList', JSON.stringify(updatedList));
  };

  const [open, setOpen] = useState(false);

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.background}>
        {exerciseList.map((exercise, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}
              key={exercise.name}>
              <Text style={{color: 'black'}}>{exercise.name}</Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text>{exercise.count}</Text>
                <Button
                  onPress={() => {
                    const newList = [...exerciseList];
                    newList[index].count++;
                    setLocalList(newList);
                  }}>
                  Bump
                </Button>
              </View>
            </View>
          );
        })}
        <Fab
          position="absolute"
          size="sm"
          icon={<AddIcon />}
          onPress={() => setOpen(true)}
        />
      </ScrollView>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Exercise</Modal.Header>
          <Modal.Body>
            <Input onChangeText={text => setInput(text)} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => {
                  setOpen(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setExerciseList([...exerciseList, {name: input, count: 0}]);
                  setOpen(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default App;
