import type { Signal } from '@builder.io/qwik';
import { useStore, useTask$ } from '@builder.io/qwik';
import { updateStoreDeep } from './updateStoreDeep';

export function useRouteLoaderStore<T extends object>(
  routeLoader: Readonly<Signal<T>>
) {
  const store = useStore<T>({} as T);

  useTask$(({ track }) => {
    track(routeLoader);

    updateStoreDeep(store, routeLoader.value);
  });

  return store;
}
