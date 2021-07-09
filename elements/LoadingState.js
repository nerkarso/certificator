import SpinnerIcon from '@/elements/SpinnerIcon';
import cx from 'classnames';

function LoadingState({ className }) {
  return (
    <div className={cx('grid place-items-center p-4', className)}>
      <SpinnerIcon />
    </div>
  );
}

export default LoadingState;
