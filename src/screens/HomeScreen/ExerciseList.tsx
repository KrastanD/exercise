import React, { useState } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { Button, Stack, Text, YStack } from 'tamagui';
import useExerciseStore from '../../state/useExerciseStore';
import EditExercise from './EditExercise';

function ExerciseList() {
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [exerciseForEdit, setExerciseForEdit] = useState<string>('');

  // const toast = useToast();
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
    // <Box safeAreaTop>
    //   {Object.keys(exerciseStore.exercises).map(exerciseId => {
    //     const exercise = exerciseStore.exercises[exerciseId];
    //     return (
    //       <Pressable
    //         key={exerciseId}
    //         onPress={() => {
    //           setExerciseForEdit(exerciseId);
    //           setOpenEditExercise(true);
    //         }}>
    //         <HStack style={$row}>
    //           <Text isTruncated w="55%">
    //             {exercise.name}
    //           </Text>
    //           <HStack style={$values} alignSelf={'flex-end'}>
    //             <Box
    //               alignItems={'flex-end'}
    //               w={50}
    //               // borderRadius={5}
    //               // borderWidth={1}
    //               paddingY={2}>
    //               <Text>{exercise.count}🔥</Text>
    //             </Box>
    //             <Button
    //               onPress={() => incrementExerciseCounter(exerciseId)}
    //               onLongPress={() => decrementExerciseCounter(exerciseId)}>
    //               Bump
    //             </Button>
    //             <IconButton
    //               variant="ghost"
    //               icon={<DeleteIcon color="red.400" />}
    //               onPress={() => exerciseStore.deleteExercise(exerciseId)}
    //             />
    //           </HStack>
    //         </HStack>
    //       </Pressable>
    //     );
    //   })}
    //   {exerciseForEdit && (
    //     <EditExercise
    //       open={openEditExercise}
    //       setOpen={setOpenEditExercise}
    //       exerciseId={exerciseForEdit}
    //       editExercise={editExercise}
    //     />
    //   )}
    // </Box>
    <Stack>
      {Object.keys(exerciseStore.exercises).map(exerciseId => {
        const exercise = exerciseStore.exercises[exerciseId];
        return (
          <Pressable
            key={exerciseId}
            onPress={() => {
              setExerciseForEdit(exerciseId);
              setOpenEditExercise(true);
            }}>
            <YStack>
              <Text>{exercise.name}</Text>
              <YStack>
                <Stack alignItems="flex-end" width={50}>
                  <Text>{exercise.count}</Text>
                </Stack>
                <Pressable
                  onPress={() => incrementExerciseCounter(exerciseId)}
                  onLongPress={() => decrementExerciseCounter(exerciseId)}>
                  <Button>
                    <Text>Bump</Text>
                  </Button>
                </Pressable>
              </YStack>
            </YStack>
          </Pressable>
        );
      })}
    </Stack>
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
