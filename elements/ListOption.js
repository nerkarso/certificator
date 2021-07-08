import CheckCircleIcon from '@/elements/CheckCircleIcon';

function ListOption({ title, active }) {
  return (
    <div className="flex justify-between w-full gap-2 px-4 py-2 text-left">
      <span className="overflow-hidden truncate overflow-ellipsis">
        {title}
      </span>
      {active && (
        <CheckCircleIcon className="w-6 h-6 text-primary-500 drop-shadow" />
      )}
    </div>
  );
}

export default ListOption;
