import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import { Context } from "../context";
import styles from "./List.css?inline";

export const List = component$(() => {
  useStyles$(styles);
  const context = useContext(Context);

  return (
    <>
      <div class="flex justify-between gap-3">
        <div class="mt-[20px]">
          <h2 class="text-[2rem]">
            {weirdPart(context.routeParams)}
            {/* Also - Wrapping this text node with a span, would make the bug go away. */}
            {/* <span>{context.data.teachers.length}</span> */}
            {context.data.teachers.length}
          </h2>
        </div>
      </div>
      <div class="mt-12 flex flex-1 flex-wrap items-start justify-between gap-y-5 max-md:mt-8">
        <div class="teacher-list-container">
          {JSON.stringify(context.data.teachers)}
        </div>
      </div>
    </>
  );
});

// Only when I destructure the object, extracting the param I modify before the navigation, the bug is reproduced.
function weirdPart(x: any) {
  const { cityName } = x;

  // Just to clarify even if we return a string that doesnt include the cityName, the bug is reproduced.
  // e.g >> return "מורים";

  return `Teachers in ${cityName}: `;
}
