import { createContextId } from '@builder.io/qwik';

interface Store {
  somethingFishy: { x: number; y: number };
  data: {
    array: string[];
  };
}
export const Context = createContextId<Store>('context');
