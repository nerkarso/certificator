function TextArea({ rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className="w-full px-4 py-2 transition duration-200 bg-white border rounded-lg shadow dark:bg-base-900 border-base-300 dark:border-base-700 dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 ring-primary-500"
      {...props}></textarea>
  );
}

export default TextArea;
