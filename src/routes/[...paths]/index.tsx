import {
  component$,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import fs from "fs";
import { Context } from "../context";
import { List } from "./List";
import { ModifyState } from "./ModifyState";

export const useData = routeLoader$((ev) => {
  const num = Number(ev.params.paths[0]) || 0;
  return JSON.parse(fs.readFileSync(`state${(num % 2) + 1}.json`, "utf-8")) as {
    routeParams: {
      cityName: string;
    };
    data: {
      teachers: number[];
    };
  };
});

export default component$(() => {
  return <Main />;
});

const Main = component$(() => {
  const data = useData();
  const store = useStore(data.value);
  useContextProvider(Context, store);

  useTask$(({ track }) => {
    track(data);

    if (store.routeParams.cityName !== data.value.routeParams.cityName) {
      store.routeParams.cityName = data.value.routeParams.cityName;
    }

    for (let i = 0; i < data.value.data.teachers.length; i++) {
      if (store.data.teachers[i] !== data.value.data.teachers[i]) {
        store.data.teachers[i] = data.value.data.teachers[i];
      }
    }

    if (store.data.teachers.length !== data.value.data.teachers.length) {
      store.data.teachers.length = data.value.data.teachers.length;
    }
  });

  return (
    <main class="mx-content mb-10 px-6 max-md:mx-0">
      <p style={{ whiteSpace: "pre-line" }}>
        {`Instructions:
          - Click the button below
          - The page will navigate to either /1 or /2
          - You will notice that the first time you click, the state is updated correctly.
          - However, the second time you click, the state is not updated correctly, the list will contain the right number of items,
            But the counter will show the wrong number of items.
          - Keep clicking the button, items keeps showing the right number of items, but the counter will stop updating.
          - I added 4 notes to the code to explain the bug better, please check them out, look for the word "Note" in the code.
        `}
      </p>
      <ModifyState />
      <List />
    </main>
  );
});
