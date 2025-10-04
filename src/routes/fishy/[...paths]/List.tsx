import { component$, useContext, useStyles$ } from '@builder.io/qwik';
import { Context } from '../context';
import styles from './List.css?inline';

export const List = component$(() => {
  useStyles$(styles);
  const context = useContext(Context);

  return (
    <>
      <div class="flex justify-between gap-3">
        <div class="mt-[20px]">
          <h2 class="text-[2rem]">
            {/* Qwik Buggy so we need to use span to get reactivity... */}
            {context.data.teachers.length}
            {test(context.routeParams)}
          </h2>
        </div>
      </div>
      <div class="mt-12 flex flex-1 flex-wrap items-start justify-between gap-y-5 max-md:mt-8">
        <div class="teacher-list-container"></div>
      </div>
    </>
  );
});

function test(x) {
  const { instrumentId, cityName } = x;
  return 'מורים';
}
