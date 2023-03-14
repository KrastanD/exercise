import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, Icon, View, Assets } from 'react-native-ui-lib';
import AddExercise from './AddExercise';
import ExerciseList from './ExerciseList';

function HomeScreen() {
  const [openAddExercise, setOpenAddExercise] = useState(false);

  return (
    <View useSafeArea flex>
      <TouchableOpacity onPress={() => setOpenAddExercise(true)}>
        <Icon source={Assets.icons.plusSmall} size={24} />
      </TouchableOpacity>
      <ScrollView style={$background}>
        <ExerciseList />
      </ScrollView>
      <AddExercise open={openAddExercise} setOpen={setOpenAddExercise} />
    </View>
  );
}

export default HomeScreen;

const $background: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
};
