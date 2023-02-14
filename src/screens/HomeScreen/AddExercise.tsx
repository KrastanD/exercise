import {
  Button,
  FormControl,
  Input,
  Modal,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import useExerciseStore from '../../state/useExerciseStore';

type AddExerciseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddExercise({ open, setOpen }: AddExerciseProps) {
  const [input, setInput] = useState('');
  const exerciseStore = useExerciseStore();

  const addExercise = () => {
    exerciseStore.addExercise(input);
    setInput('');
    setOpen(false);
  };

  const isInputInExerciseList = Object.values(exerciseStore.exercises)
    .map(e => e.name)
    .includes(input);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Exercise</Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={isInputInExerciseList} w="75%" maxW="300px">
            <Input
              value={input}
              placeholder="New exercise"
              onChangeText={(text: React.SetStateAction<string>) =>
                setInput(text)
              }
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              This exercise already exists. Try a different one.
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" onPress={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              isDisabled={isInputInExerciseList || input.length === 0}
              onPress={addExercise}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default AddExercise;
