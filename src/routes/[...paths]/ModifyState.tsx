import { component$, useContext } from "@builder.io/qwik";

import { useNavigate } from "@builder.io/qwik-city";
import { Context } from "../context";

export const ModifyState = component$(() => {
  const context = useContext(Context);
  const navigate = useNavigate();

  return (
    <button
      onClick$={() => {
        // Note 1: If we remove the line below, the bug is not reproducable anymore.
        context.routeParams.cityName = "???";

        if (window.location.href.includes("/1")) {
          navigate(`/2`);
        } else {
          navigate(`/1`);
        }
      }}
    >
      Click here
    </button>
  );
});
