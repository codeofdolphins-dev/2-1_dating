import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const options = [
  'Viewed me',
  'Groups / Blogs',
  'Speed Date',
  'Travel Plans',
  'Parties & Events'
];

export default function CheckboxDropdown() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <div className="relative inline-block text-left">
      <Listbox as="div">
        {({ open }) => (
          <>
            <Listbox.Button className="bg-gray-800 text-white px-4 py-2 rounded">
              Filter
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className=" mt-2 w-56 bg-gray-900 text-white rounded shadow-lg z-10">
                {options.map((option) => (
                  <Listbox.Option key={option} value={option} as={Fragment}>
                    <div
                      className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => toggleOption(option)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        readOnly
                        className="mr-2"
                      />
                      {option}
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
