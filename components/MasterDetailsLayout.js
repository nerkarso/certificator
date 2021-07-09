import { PlusIcon } from '@heroicons/react/solid';

function MasterDetailsLayout({
  title,
  onCreateHandler,
  masterView,
  detailsView,
  toolbarView,
}) {
  return (
    <>
      <div className="z-10 flex flex-col flex-shrink-0 transition duration-200 bg-white shadow lg:w-96 dark:bg-base-800">
        <div className="flex items-center justify-between mx-6 mt-6 mb-4">
          <h1 className="text-4xl font-bold dark:text-white">{title}</h1>
          <button
            onClick={onCreateHandler}
            className="text-white transition duration-200 rounded-full shadow bg-primary-500 focus:outline-none hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-base-800">
            <PlusIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="flex-1 px-6 py-4 overflow-y-auto">{masterView}</div>
      </div>
      <div className="flex flex-col w-full transition duration-200 bg-base-100 dark:bg-base-900">
        {detailsView}
        <div className="flex-grow-0 transition duration-200 border-t shadow border-base-300 dark:bg-base-900 dark:border-base-700">
          {toolbarView}
        </div>
      </div>
    </>
  );
}

export default MasterDetailsLayout;
