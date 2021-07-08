import cx from 'classnames';

function Button({ children, className, block, ...props }) {
  return (
    <button
      className={cx(
        'h-10 px-4 py-2 bg-primary-500 rounded-lg text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:bg-primary-600 dark:focus:ring-offset-gray-800 transition duration-200',
        className,
        {
          'w-full': block,
          'cursor-not-allowed opacity-50': props.disabled,
        },
      )}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
