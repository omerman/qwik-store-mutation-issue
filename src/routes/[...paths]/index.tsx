import { component$, useContextProvider } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import fs from "fs";
import { Context } from "../context";
import { useRouteLoaderStore } from "~/utils/useRouteLoaderStore";
import { ModifyState } from "./ModifyState";
import { List } from "./List";

export const useData = routeLoader$((ev) => {
  const num = Number(ev.params.paths[0]) || 0;
  return JSON.parse(fs.readFileSync(`state${(num % 2) + 1}.json`, "utf-8"));
});

export default component$(() => {
  return <Main />;
});

const Main = component$(() => {
  const data = useData();
  useContextProvider(Context, useRouteLoaderStore(data));

  return (
    <main class="mx-content mb-10 px-6 max-md:mx-0">
      <p style={{ whiteSpace: "pre-line" }}>
        {`Instructions:
          - Click the button below
          - The page will navigate to either /1 or /2
          - You will notice that the first time you click, the state is updated correctly.
          - However, the second time you click, the state is not updated correctly, the list will contain the right number of items,
            But the counter will show the wrong number of items.
          - Keep clicking the button, items keeps showing the right number of items, but the counter will stop updating.`}
      </p>
      <ModifyState />
      <List />
    </main>
  );
});
