import {
  component$,
  useContext,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Context } from './context';

export default component$(() => {
  useContextProvider(
    Context,
    useStore({
      somethingFishy: { x: 1, y: 2 },
      data: {
        array: [],
      },
    })
  );

  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <AnotherComponent />
      <Component />
    </>
  );
});

const AnotherComponent = component$(() => {
  const store = useContext(Context);
  return (
    <>
      <button
        onClick$={() => {
          store.somethingFishy.x = Math.random();
          store.somethingFishy.y = Math.random();
          store.data.array[store.data.array.length] = 'OK';
        }}
      >
        Click here
      </button>
    </>
  );
});

const Component = component$(() => {
  const store = useContext(Context);
  return (
    <>
      <h2>
        Omer {store.data.array.length}
        {destructureFishy(store.somethingFishy)}
      </h2>
    </>
  );
});

function destructureFishy({ x, y }: any) {
  return `What The F? ${x} ${y}`;
}

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
