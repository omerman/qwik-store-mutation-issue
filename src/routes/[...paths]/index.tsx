import { component$, useStore, useTask$ } from "@qwik.dev/core";
import { routeLoader$, useNavigate } from "@qwik.dev/router";

export const useData = routeLoader$((ev) => {
  const city = ev.params.paths;

  if (city === "Tokyo") {
    return {
      routeParams: {
        cityName: "Tokyo",
      },
      teachers: [1, 2, 3, 4, 5],
    };
  } else {
    return {
      routeParams: {
        cityName: "Tel_Aviv",
      },
      teachers: [1],
    };
  }
});

export default component$(() => {
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
          - The page will navigate to either /Tokyo or /Tel_Aviv
          - You will notice that the first time you click, the state is updated correctly.
          - However, the second time you click, the state is not updated correctly, the list will contain the right number of items,
            But the counter will show the wrong number of items.
          - Keep clicking the button, array keeps showing the right items, but the counter will stop updating.
          - I added 4 notes to the code to explain the bug better, please check them out, look for the word "Note" in this file.
        `}
      </p>
      <button
        onClick$={() => {
          // Note 1: If we remove the line below, the bug is not reproducable anymore.
          store.routeParams.cityName = "???";

          if (window.location.href.includes("/Tokyo")) {
            navigate(`/Tel_Aviv`);
          } else {
            navigate(`/Tokyo`);
          }
        }}
      >
        Click here
      </button>
      <div class="text-[2rem]">
        {weirdPart(store.routeParams)}
        {store.teachers.length}
        {/* Note 4: 
           Another thing I observed is that wrapping the above text node with a span will make the bug "go away".
           If you uncomment the span and keep the above text node, the bug is STILL reproduced, on the above text node only.
        */}
        {/* <span>__{store.teachers.length}__</span> */}
      </div>
      <div class="teacher-list-container">{JSON.stringify(store.teachers)}</div>
    </main>
  );
});

function weirdPart(x: any) {
  // Note 2: Only when I "touch" the param I modify before the navigation as part of the render, the bug is reproduced.
  const { cityName } = x;

  return `City Name - ${cityName}: `;

  // Note 3: Just to clarify even if we return a string that doesn't include the cityName, the bug is reproduced.
  //         (As long as the cityName is destructured, the bug is reproduced.)
  // return "Text that doesn't include the cityName";
}
