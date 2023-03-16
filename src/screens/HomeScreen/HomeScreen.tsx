import { Plus } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { Dialog, ScrollView, Button } from 'tamagui';
import AddExercise from './AddExercise';
import ExerciseList from './ExerciseList';

function HomeScreen() {
  const [openAddExercise, setOpenAddExercise] = useState(false);

  return (
    <>
      {/* <ScrollView> */}
      <Button
        position="absolute"
        icon={Plus}
        onPress={() => setOpenAddExercise(true)}
      />
      <ExerciseList />
      {/* </ScrollView> */}
      <Dialog>
        <AddExercise open={openAddExercise} setOpen={setOpenAddExercise} />
      </Dialog>
    </>
  );
}

export default HomeScreen;

const $background: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
};
