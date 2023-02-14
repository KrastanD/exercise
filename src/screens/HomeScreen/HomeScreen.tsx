import { AddIcon, Fab, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import AddExercise from './AddExercise';
import ExerciseList from './ExerciseList';

function HomeScreen() {
  const [openAddExercise, setOpenAddExercise] = useState(false);

  return (
    <>
      <ScrollView style={$background}>
        <ExerciseList />
        <Fab
          position="absolute"
          size="sm"
          icon={<AddIcon />}
          onPress={() => setOpenAddExercise(true)}
        />
      </ScrollView>
      <AddExercise open={openAddExercise} setOpen={setOpenAddExercise} />
    </>
  );
}

export default HomeScreen;

const $background: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
};
