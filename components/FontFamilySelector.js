import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';

function FontFamilySelector({ value, onChange }) {
  const options = ['Default', 'Arizonia', 'Great Vibes'];
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    onChange(selected);
    // eslint-disable-next-line
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative dark:text-white">
        <Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left transition duration-200 bg-white border rounded-lg shadow dark:border-base-600 dark:bg-base-900 border-base-300 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 ring-primary-500">
          <span className="block truncate">{selected}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-base-400" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white border rounded-lg shadow-lg border-base-300 dark:border-base-700 dark:bg-base-900 max-h-60 focus:outline-none sm:text-sm">
            {options.map((item, i) => (
              <Listbox.Option
                value={item}
                key={i}
                className={({ active }) =>
                  `${
                    active && 'bg-base-100 dark:bg-base-800'
                  } select-none relative py-2 px-4`
                }>
                {({ selected, active }) => (
                  <span
                    className={`${
                      selected ? 'font-semibold' : 'font-normal'
                    } block truncate`}>
                    {item}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default FontFamilySelector;
