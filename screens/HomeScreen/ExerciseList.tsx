import {Box, Button, DeleteIcon, HStack, IconButton, Text} from 'native-base';
import React from 'react';
import {ViewStyle} from 'react-native';
import {Exercise} from '../../types';

type ExerciseListProps = {
  exerciseList: Exercise[];
  incrementExerciseCounter: (index: number) => void;
  deleteExercise: (exercise: Exercise) => void;
};

function ExerciseList({
  exerciseList,
  incrementExerciseCounter,
  deleteExercise,
}: ExerciseListProps) {
  return (
    <Box safeAreaTop>
      {exerciseList.map((exercise, index) => {
        return (
          <HStack style={$row} key={exercise.name}>
            <Text>{exercise.name}</Text>
            <HStack style={$values}>
              <Text>{exercise.count}</Text>
              <Button onPress={() => incrementExerciseCounter(index)}>
                Bump
              </Button>
              <IconButton
                variant="ghost"
                icon={<DeleteIcon color="red.400" />}
                onPress={() => deleteExercise(exercise)}
              />
            </HStack>
          </HStack>
        );
      })}
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
