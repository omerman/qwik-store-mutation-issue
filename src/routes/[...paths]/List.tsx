import { component$, useContext } from "@builder.io/qwik";
import { Context } from "../context";

export const List = component$(() => {
  const context = useContext(Context);

  return (
    <>
      <div class="text-[2rem]">
        {weirdPart(context.routeParams)}
        {context.data.teachers.length}
        {/* Note 4: Another thing I observed is that wrapping this text node with a span will make the bug "go away". */}
        {/* <span>{context.data.teachers.length}</span> */}
      </div>
      <div class="teacher-list-container">
        {JSON.stringify(context.data.teachers)}
      </div>
    </>
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
