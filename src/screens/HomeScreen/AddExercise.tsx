import React, { useState } from 'react';
import { X } from '@tamagui/lucide-icons';
import {
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Text,
  Unspaced,
  YStack,
} from 'tamagui';
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
    <Dialog.Portal>
      <Dialog.Overlay key="overlay" />
      <Dialog.Content bordered elevate key="content" space>
        <Dialog.Title>Add Exercise</Dialog.Title>
        <Fieldset space="$4" horizontal>
          <Text justifyContent="flex-end">Name</Text>
          <Input
            id="name"
            value={name}
            onChangeText={(text: React.SetStateAction<string>) => setName(text)}
          />
        </Fieldset>
        <Fieldset space="$4" horizontal>
          <Text justifyContent="flex-end">Step</Text>
          <Input
            id="step"
            value={step.toString()}
            inputMode="numeric"
            onChangeText={(str: React.SetStateAction<string>) => {
              setStep(Number(str));
            }}
          />
        </Fieldset>

        <YStack alignItems="flex-end" marginTop="$2">
          <Dialog.Close displayWhenAdapted asChild>
            <Button theme="alt1" aria-label="Close">
              <Text>Save changes</Text>
            </Button>
          </Dialog.Close>
        </YStack>

        <Unspaced>
          <Dialog.Close asChild>
            <Button pos="absolute" t="$3" r="$3" size="$2" circular icon={X} />
          </Dialog.Close>
        </Unspaced>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default AddExercise;
