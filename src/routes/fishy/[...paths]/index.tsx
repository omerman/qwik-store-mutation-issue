import { component$, useContextProvider } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import fs from 'fs';
import { Context } from '../context';
import { useRouteLoaderStore } from '~/utils/useRouteLoaderStore';
import { ModifyState } from './ModifyState';
import { List } from './List';

export const useData = routeLoader$((ev) => {
  const num = Number(ev.params.paths[0]) || 0;
  return JSON.parse(fs.readFileSync(`state${(num % 3) + 1}.json`, 'utf-8'));
});

export default component$(() => {
  return <Main />;
});

const Main = component$(() => {
  const data = useData();
  useContextProvider(Context, useRouteLoaderStore(data));

  return (
    <main class="mx-content mb-10 px-6 max-md:mx-0">
      <ModifyState />
      <List />
    </main>
  );
});
