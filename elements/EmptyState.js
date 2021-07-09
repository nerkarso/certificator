function EmptyState({ children }) {
  return (
    <div className="px-4 py-2 text-sm text-center transition duration-200 bg-black rounded-md text-base-500 bg-opacity-5 dark:bg-white dark:text-base-300 dark:bg-opacity-10">
      <p>{children}</p>
    </div>
  );
}

export default EmptyState;
