import { component$, useContext } from "@builder.io/qwik";

import { useNavigate } from "@builder.io/qwik-city";
import { Context } from "../context";

export const ModifyState = component$(() => {
  const context = useContext(Context);
  const navigate = useNavigate();

  return (
    <button
      onClick$={() => {
        context.routeParams.cityName = "???";
        if (window.location.href.includes("fishy/1")) {
          navigate(`/fishy/2`);
        } else {
          navigate(`/fishy/1`);
        }
      }}
    >
      Click here
    </button>
  );
});
