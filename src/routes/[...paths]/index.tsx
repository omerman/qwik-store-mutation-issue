import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";

import fs from "fs";

export const useData = routeLoader$((ev) => {
  const num = Number(ev.params.paths[0]) || 0;
  return JSON.parse(fs.readFileSync(`state${(num % 2) + 1}.json`, "utf-8")) as {
    routeParams: {
      cityName: string;
    };
    teachers: number[];
  };
});

export default component$(() => {
  return <Main />;
});

const Main = component$(() => {
  const data = useData();
  const store = useStore(data.value);
  const navigate = useNavigate();

  useTask$(({ track }) => {
    track(data);

    if (store.routeParams.cityName !== data.value.routeParams.cityName) {
      store.routeParams.cityName = data.value.routeParams.cityName;
    }

    for (let i = 0; i < data.value.teachers.length; i++) {
      if (store.teachers[i] !== data.value.teachers[i]) {
        store.teachers[i] = data.value.teachers[i];
      }
    }

    if (store.teachers.length !== data.value.teachers.length) {
      store.teachers.length = data.value.teachers.length;
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
          - I added 4 notes to the code to explain the bug better, please check them out, look for the word "Note" in this file.
        `}
      </p>
      <button
        onClick$={() => {
          // Note 1: If we remove the line below, the bug is not reproducable anymore.
          store.routeParams.cityName = "???";

          if (window.location.href.includes("/1")) {
            navigate(`/2`);
          } else {
            navigate(`/1`);
          }
        }}
      >
        Click here
      </button>
      <div class="text-[2rem]">
        {weirdPart(store.routeParams)}
        {store.teachers.length}
        {/* Note 4: Another thing I observed is that wrapping the above text node with a span will make the bug "go away". */}
        {/* <span>{store.teachers.length}</span> */}
      </div>
      <div class="teacher-list-container">{JSON.stringify(store.teachers)}</div>
    </main>
  );
});

// Note 2: Only when I destructure the object, extracting the param I modify before the navigation, the bug is reproduced.
function weirdPart(x: any) {
  const { cityName } = x;

  return `City Name - ${cityName}: `;

  // Note 3: Just to clarify even if we return a string that doesn't include the cityName, the bug is reproduced.
  //         (As long as the cityName is destructured, the bug is reproduced.)
  //         e.g >> return "Text that doesn't include the cityName";
}
