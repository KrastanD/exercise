import {
  Button,
  FormControl,
  Input,
  Modal,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import { Exercise } from '../../types';

type AddExerciseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseList: Exercise[];
  setExerciseList: (updatedList: Exercise[]) => Promise<void>;
};

function AddExercise({
  open,
  setOpen,
  exerciseList,
  setExerciseList,
}: AddExerciseProps) {
  const [input, setInput] = useState('');

  const addExercise = () => {
    setExerciseList([...exerciseList, { name: input, count: 0 }]);
    setInput('');
    setOpen(false);
  };

  const isInputInExerciseList = exerciseList.map(e => e.name).includes(input);

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
