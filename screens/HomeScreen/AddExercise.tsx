import {Button, Input, Modal} from 'native-base';
import React, {useState} from 'react';
import {Exercise} from '../../types';

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
    setExerciseList([...exerciseList, {name: input, count: 0}]);
    setInput('');
    setOpen(false);
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Exercise</Modal.Header>
        <Modal.Body>
          <Input
            value={input}
            onChangeText={(text: React.SetStateAction<string>) =>
              setInput(text)
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" onPress={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onPress={addExercise}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default AddExercise;
