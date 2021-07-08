import EmptyState from '@/elements/EmptyState';
import ImageOption from '@/elements/ImageOption';
import LoadingState from '@/elements/LoadingState';
import useDesignsApi from '@/hooks/useDesignsApi';
import { RadioGroup } from '@headlessui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

function DesignChooser({ value, onChange, className }) {
  const [selected, setSelected] = useState(value);
  const { data, error } = useDesignsApi();

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (data?.designs?.length > 0) {
      const filtered = data.designs.filter((item) => item._id === selected);
      if (filtered.length > 0) {
        onChange(filtered[0]);
      }
    }
  }, [selected]);

  useEffect(() => {
    if (data?.designs?.length > 0) {
      if (!value && !selected) {
        setSelected(data.designs[0]._id);
      }
    }
  }, [data]);

  if (!data && !error) return <LoadingState className="text-primary-500" />;
  if (error) return <EmptyState>{error.message}</EmptyState>;
  if (data?.error) return <EmptyState>{data.message}</EmptyState>;
  if (data?.designs?.length === 0) {
    return <EmptyState>No designs available</EmptyState>;
  }

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      className={cx(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3',
        className,
      )}>
      {data.designs.map((item) => (
        <RadioGroup.Option
          value={item._id}
          key={item._id}
          className="focus:outline-none">
          {({ checked }) => (
            <div className="text-center">
              <ImageOption
                value={`data:image/svg+xml;utf8,${item.contents}`}
                checked={checked}
                width="w-full"
                height="h-[6.5rem]"
              />
              <span
                className={cx(
                  'inline-block mt-2 text-base-600 dark:text-base-400 text-sm',
                  {
                    '!text-primary-500': checked,
                  },
                )}>
                {item.title}
              </span>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default DesignChooser;
