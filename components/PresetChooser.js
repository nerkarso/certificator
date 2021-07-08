import EmptyState from '@/elements/EmptyState';
import ListOption from '@/elements/ListOption';
import LoadingState from '@/elements/LoadingState';
import usePresetsApi from '@/hooks/usePresetsApi';
import { RadioGroup } from '@headlessui/react';
import { useEffect, useState } from 'react';

function PresetChooser({ value, onChange }) {
  const [selected, setSelected] = useState(value);
  const { data, error } = usePresetsApi();

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (data?.presets?.length > 0) {
      const filtered = data.presets.filter((item) => item._id === selected);
      if (filtered.length > 0) {
        onChange(filtered[0]);
      }
    }
  }, [selected]);

  useEffect(() => {
    if (data?.presets?.length > 0) {
      if (!value && !selected) {
        setSelected(data.presets[0]._id);
      }
    }
  }, [data]);

  if (!data && !error) return <LoadingState className="text-primary-500" />;
  if (error) return <EmptyState>{error.message}</EmptyState>;
  if (data?.error) return <EmptyState>{data.message}</EmptyState>;
  if (data?.presets?.length === 0) {
    return <EmptyState>No presets available</EmptyState>;
  }

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      className="flex flex-col gap-2">
      {data.presets.map((item) => (
        <RadioGroup.Option
          value={item._id}
          key={item._id}
          className="transition duration-200 rounded-lg cursor-pointer text-primary-600 bg-primary-600 bg-opacity-10 focus:base-700 hover:bg-opacity-25 hover:bg-primary-500 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:outline-none dark:bg-opacity-20 dark:text-primary-400 dark:hover:bg-opacity-30 dark:ring-offset-base-800">
          {({ checked }) => <ListOption title={item.title} active={checked} />}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default PresetChooser;
