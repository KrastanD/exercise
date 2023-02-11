import {
  Box,
  Button,
  DeleteIcon,
  HStack,
  IconButton,
  Pressable,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { Exercise } from '../../types';
import EditExercise from './EditExercise';

type ExerciseListProps = {
  exerciseList: Exercise[];
  incrementExerciseCounter: (index: number) => void;
  decrementExerciseCounter: (index: number) => void;
  deleteExercise: (exercise: Exercise) => void;
  setExerciseList: (updatedList: Exercise[]) => Promise<void>;
};

function ExerciseList({
  exerciseList,
  incrementExerciseCounter,
  decrementExerciseCounter,
  deleteExercise,
  setExerciseList,
}: ExerciseListProps) {
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [exerciseForEdit, setExerciseForEdit] = useState<undefined | Exercise>(
    undefined,
  );

  const editExercise = (name: string) => {
    const newList = [...exerciseList];
    const index = exerciseList.findIndex(
      ex => ex.name === exerciseForEdit?.name,
    );
    newList[index].name = name;
    setExerciseList(newList);
    setOpenEditExercise(false);
  };

  return (
    <Box safeAreaTop>
      {exerciseList.map((exercise, index) => {
        return (
          <Pressable
            key={exercise.name}
            onPress={() => {
              setExerciseForEdit(exercise);
              setOpenEditExercise(true);
            }}>
            <HStack style={$row}>
              <Text>{exercise.name}</Text>
              <HStack style={$values}>
                <Text>{exercise.count}</Text>
                <Button
                  onPress={() => incrementExerciseCounter(index)}
                  onLongPress={() => decrementExerciseCounter(index)}>
                  Bump
                </Button>
                <IconButton
                  variant="ghost"
                  icon={<DeleteIcon color="red.400" />}
                  onPress={() => deleteExercise(exercise)}
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
          exercise={exerciseForEdit}
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
