import React, { useState } from 'react';
import {
  Button,
  NumberInput,
  PanningProvider,
  Text,
  TextField,
  Dialog,
} from 'react-native-ui-lib';
import useExerciseStore from '../../state/useExerciseStore';

type AddExerciseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddExercise({ open, setOpen }: AddExerciseProps) {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const exerciseStore = useExerciseStore();

  const addExercise = () => {
    exerciseStore.addExercise(name, step);
    setName('');
    setStep(1);
    setOpen(false);
  };

  const isInputInExerciseList = Object.values(exerciseStore.exercises)
    .map(e => e.name)
    .includes(name);

  return (
    // <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
    //   <Modal.Content>
    //     <Modal.CloseButton />
    //     <Modal.Header>Add Exercise</Modal.Header>
    //     <Modal.Body>
    //       <FormControl isInvalid={isInputInExerciseList} w="75%" maxW="300px">
    //         <FormControl.Label>Name</FormControl.Label>
    //         <Input
    //           value={name}
    //           placeholder="New exercise"
    //           onChangeText={(text: React.SetStateAction<string>) =>
    //             setName(text)
    //           }
    //         />
    //         <FormControl.Label>Step</FormControl.Label>
    //         <Input
    //           value={step.toString()}
    //           inputMode="numeric"
    //           onChangeText={(str: React.SetStateAction<string>) => {
    //             setStep(Number(str));
    //           }}
    //         />
    //         <FormControl.ErrorMessage
    //           leftIcon={<WarningOutlineIcon size="xs" />}>
    //           This exercise name already exists. Try a different one.
    //         </FormControl.ErrorMessage>
    //       </FormControl>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button.Group space={2}>
    //         <Button variant="ghost" onPress={() => setOpen(false)}>
    //           Cancel
    //         </Button>
    //         <Button
    //           isDisabled={isInputInExerciseList || name.length === 0}
    //           onPress={addExercise}>
    //           Save
    //         </Button>
    //       </Button.Group>
    //     </Modal.Footer>
    //   </Modal.Content>
    // </Modal>
    <Dialog
      visible={open}
      onDismiss={() => setOpen(false)}
      panDirection={PanningProvider.Directions.DOWN}
      centerV
      centerH>
      <TextField onChangeText={setName} placeholder={'name'} />
      {/* <NumberInput
        initialNumber={1}
        onChangeNumber={(val: number) => setStep(val)}
        placeholder="Step size"
      /> */}
      <Button onPress={addExercise}>
        <Text>Save</Text>
      </Button>
    </Dialog>
  );
}

export default AddExercise;
