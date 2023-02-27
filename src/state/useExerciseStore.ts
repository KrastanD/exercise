import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import zustandStorage from './helpers/zustandStorage';
import uuid from 'react-native-uuid';
import { Exercise } from '../../types';

interface ExerciseStore {
  exercises: Record<string, Exercise>;
  addExercise: (name: string, step: number) => void;
  deleteExercise: (id: string) => void;
  incrementExerciseCount: (id: string, value?: number) => void;
  decrementExerciseCount: (id: string, value?: number) => void;
  editExercise: (id: string, name: string) => void;
}

const useExerciseStore = create<ExerciseStore>()(
  immer(
    persist(
      set => ({
        exercises: {},
        addExercise: (name: string, step = 1) =>
          set(state => {
            const id = uuid.v4().toString();
            state.exercises[id] = { name: name, count: 0, step: step };
          }),
        deleteExercise: id =>
          set(state => {
            delete state.exercises[id];
          }),
        editExercise: (id, name) =>
          set(state => {
            state.exercises[id].name = name;
          }),
        incrementExerciseCount: id =>
          set(state => {
            state.exercises[id].count += state.exercises[id].step;
          }),
        decrementExerciseCount: id =>
          set(state => {
            state.exercises[id].count -= state.exercises[id].step;
          }),
      }),
      {
        name: 'exerciseStore',
        storage: zustandStorage,
      },
    ),
  ),
);

export default useExerciseStore;
