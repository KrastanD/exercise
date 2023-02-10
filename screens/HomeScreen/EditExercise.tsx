import { Button, Input, Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Exercise } from '../../types';

type EditExerciseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exercise: Exercise;
  editExercise: (name: string) => void;
};
function EditExercise({
  open,
  setOpen,
  exercise,
  editExercise,
}: EditExerciseProps) {
  const [input, setInput] = useState(exercise.name);
  useEffect(() => {
    setInput(exercise.name);
  }, [exercise.name]);
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      <Modal.Content style={{}}>
        <Modal.CloseButton />
        <Modal.Header>Edit Exercise</Modal.Header>
        <Modal.Body>
          <Input
            value={input}
            placeholder="Exercise name"
            onChangeText={(text: React.SetStateAction<string>) =>
              setInput(text)
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              onPress={() => {
                setOpen(false);
              }}>
              Cancel
            </Button>
            <Button onPress={() => editExercise(input)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default EditExercise;
