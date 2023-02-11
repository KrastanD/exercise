import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon, Fab, ScrollView, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import { Exercise } from '../../types';
import AddExercise from './AddExercise';
import ExerciseList from './ExerciseList';

function HomeScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [openAddExercise, setOpenAddExercise] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getLocalList = async () => {
      const localList = await AsyncStorage.getItem('exerciseList');
      if (localList) {
        setExercises(JSON.parse(localList) as Exercise[]);
      }
    };
    getLocalList();
  }, []);

  const setLocalList = async (updatedList: Exercise[]) => {
    setExercises(updatedList);
    await AsyncStorage.setItem('exerciseList', JSON.stringify(updatedList));
  };

  const deleteExercise = (exercise: Exercise) => {
    setExercises(exList =>
      exList.filter(value => value.name !== exercise.name),
    );
  };

  const incrementExerciseCounter = (index: number) => {
    const newList = [...exercises];
    newList[index].count++;
    setLocalList(newList);
    toast.show({
      description: 'Increased 🎉',
      placement: 'bottom',
      duration: 1000,
    });
  };

  const decrementExerciseCounter = (index: number) => {
    const newList = [...exercises];
    if (newList[index].count <= 0) {
      return;
    }
    newList[index].count--;
    setLocalList(newList);
    toast.show({
      description: 'Decreased 😢',
      placement: 'bottom',
      duration: 1000,
    });
  };

  return (
    <>
      <ScrollView style={$background}>
        <ExerciseList
          exerciseList={exercises}
          incrementExerciseCounter={incrementExerciseCounter}
          decrementExerciseCounter={decrementExerciseCounter}
          deleteExercise={deleteExercise}
          setExerciseList={setLocalList}
        />
        <Fab
          position="absolute"
          size="sm"
          icon={<AddIcon />}
          onPress={() => setOpenAddExercise(true)}
        />
      </ScrollView>
      <AddExercise
        open={openAddExercise}
        setOpen={setOpenAddExercise}
        exerciseList={exercises}
        setExerciseList={setLocalList}
      />
    </>
  );
}

export default HomeScreen;

const $background: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
};
