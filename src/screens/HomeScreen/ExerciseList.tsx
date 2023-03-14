import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import {
  Assets,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import useExerciseStore from '../../state/useExerciseStore';
import EditExercise from './EditExercise';

function ExerciseList() {
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [exerciseForEdit, setExerciseForEdit] = useState<string>('');

  const exerciseStore = useExerciseStore();

  const editExercise = (id: string, name: string) => {
    exerciseStore.editExercise(id, name);
    setOpenEditExercise(false);
  };

  const incrementExerciseCounter = (id: string) => {
    exerciseStore.incrementExerciseCount(id);
    // toast.show({
    //   description: 'Increased 🎉',
    //   placement: 'bottom',
    //   duration: 1000,
    // });
  };

  const decrementExerciseCounter = (id: string) => {
    if (exerciseStore.exercises[id].count > 0) {
      exerciseStore.decrementExerciseCount(id);
      // toast.show({
      //   description: 'Decreased 😢',
      //   placement: 'bottom',
      //   duration: 1000,
      // });
    }
  };

  return (
    <View useSafeArea>
      {Object.keys(exerciseStore.exercises).map(exerciseId => {
        const exercise = exerciseStore.exercises[exerciseId];
        return (
          <TouchableOpacity
            key={exerciseId}
            onPress={() => {
              setExerciseForEdit(exerciseId);
              setOpenEditExercise(true);
            }}>
            <View centerH style={$row}>
              <Text isTruncated w="55%">
                {exercise.name}
              </Text>
              <View style={$values}>
                <View centerH width={35} br10 paddingB-10>
                  <Text>{exercise.count}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => incrementExerciseCounter(exerciseId)}
                  onLongPress={() => decrementExerciseCounter(exerciseId)}>
                  <Text>Bump</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => exerciseStore.deleteExercise(exerciseId)}>
                  <Icon source={Assets.icons.check} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      {/* {exerciseForEdit && (
        <EditExercise
          open={openEditExercise}
          setOpen={setOpenEditExercise}
          exerciseId={exerciseForEdit}
          editExercise={editExercise}
        />
      )} */}
    </View>
  );
}

export default ExerciseList;

const $row: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 5,
  alignItems: 'center',
};

const $values: ViewStyle = {
  flexDirection: 'row',
  gap: 5,
  alignItems: 'center',
};
