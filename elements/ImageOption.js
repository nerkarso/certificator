import CheckCircleIcon from '@/elements/CheckCircleIcon';
import cx from 'classnames';
import { useState } from 'react';

function ImageOption({ value, checked, width, height }) {
  const [imageSource, setImageSource] = useState(value);

  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-lg shadow cursor-pointer ring-offset-2 ring-primary-500 dark:ring-offset-base-800 transition duration-200',
        {
          'ring-2 ': checked,
        },
      )}>
      <div className={cx('relative overflow-hidden', width, height)}>
        <img
          src={imageSource}
          onError={() => setImageSource('/design-blank.svg')}
          className="absolute inset-0 object-cover w-full h-full"
          alt="Design"
        />
      </div>
      {checked && (
        <CheckCircleIcon className="absolute inset-0 w-6 h-6 text-primary-500 drop-shadow" />
      )}
    </div>
  );
}

export default ImageOption;
