import React, { useEffect, useState } from 'react';
import useExerciseStore from '../../state/useExerciseStore';

type EditExerciseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseId: string;
  editExercise: (id: string, name: string) => void;
};
function EditExercise({
  open,
  setOpen,
  exerciseId,
  editExercise,
}: EditExerciseProps) {
  const exerciseStore = useExerciseStore();
  const exercise = exerciseStore.exercises[exerciseId];
  const [input, setInput] = useState(exercise.name);

  useEffect(() => {
    setInput(exercise.name);
  }, [exercise.name]);

  return (
    // <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
    //   <Modal.Content style={{}}>
    //     <Modal.CloseButton />
    //     <Modal.Header>Edit Exercise</Modal.Header>
    //     <Modal.Body>
    //       <Input
    //         value={input}
    //         placeholder="Exercise name"
    //         onChangeText={(text: React.SetStateAction<string>) =>
    //           setInput(text)
    //         }
    //       />
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button.Group space={2}>
    //         <Button
    //           variant="ghost"
    //           onPress={() => {
    //             setOpen(false);
    //           }}>
    //           Cancel
    //         </Button>
    //         <Button onPress={() => editExercise(exerciseId, input)}>
    //           Save
    //         </Button>
    //       </Button.Group>
    //     </Modal.Footer>
    //   </Modal.Content>
    // </Modal>
    <></>
  );
}

export default EditExercise;
