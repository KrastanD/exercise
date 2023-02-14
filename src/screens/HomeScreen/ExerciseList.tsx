import {
  Box,
  Button,
  DeleteIcon,
  HStack,
  IconButton,
  Pressable,
  Text,
  useToast,
} from 'native-base';
import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import useExerciseStore from '../../state/useExerciseStore';
import EditExercise from './EditExercise';

function ExerciseList() {
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [exerciseForEdit, setExerciseForEdit] = useState<string>('');

  const toast = useToast();
  const exerciseStore = useExerciseStore();

  const editExercise = (id: string, name: string) => {
    exerciseStore.editExercise(id, name);
    setOpenEditExercise(false);
  };

  const incrementExerciseCounter = (id: string) => {
    exerciseStore.incrementExerciseCount(id);
    toast.show({
      description: 'Increased 🎉',
      placement: 'bottom',
      duration: 1000,
    });
  };

  const decrementExerciseCounter = (id: string) => {
    if (exerciseStore.exercises[id].count > 0) {
      exerciseStore.decrementExerciseCount(id);
      toast.show({
        description: 'Decreased 😢',
        placement: 'bottom',
        duration: 1000,
      });
    }
  };

  return (
    <Box safeAreaTop>
      {Object.keys(exerciseStore.exercises).map(exerciseId => {
        const exercise = exerciseStore.exercises[exerciseId];
        return (
          <Pressable
            key={exerciseId}
            onPress={() => {
              setExerciseForEdit(exerciseId);
              setOpenEditExercise(true);
            }}>
            <HStack style={$row}>
              <Text isTruncated w="55%">
                {exercise.name}
              </Text>
              <HStack style={$values} alignSelf={'flex-end'}>
                <Box
                  alignItems={'center'}
                  w={35}
                  borderRadius={5}
                  borderWidth={1}
                  paddingY={2}>
                  <Text>{exercise.count}</Text>
                </Box>
                <Button
                  onPress={() => incrementExerciseCounter(exerciseId)}
                  onLongPress={() => decrementExerciseCounter(exerciseId)}>
                  Bump
                </Button>
                <IconButton
                  variant="ghost"
                  icon={<DeleteIcon color="red.400" />}
                  onPress={() => exerciseStore.deleteExercise(exerciseId)}
                />
              </HStack>
            </HStack>
          </Pressable>
        );
      })}
      {exerciseForEdit && (
        <EditExercise
          open={openEditExercise}
          setOpen={setOpenEditExercise}
          exerciseId={exerciseForEdit}
          editExercise={editExercise}
        />
      )}
    </Box>
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
