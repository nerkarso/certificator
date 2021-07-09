import Button from '@/elements/Button';
import SpinnerIcon from '@/elements/SpinnerIcon';

function DetailsToolbarView({
  onSaveHandler,
  onDeleteHandler,
  isSaving,
  isDeleting,
  isSaveDisabled,
  isDeleteDisabled,
  isDeleteShown,
}) {
  return (
    <div className="flex items-center justify-between flex-grow-0 flex-shrink-0 max-w-2xl gap-4 px-6 py-4 mx-auto">
      <Button
        onClick={onSaveHandler}
        className="grid w-24 place-items-center"
        disabled={isSaveDisabled}>
        {isSaving ? <SpinnerIcon /> : 'Save'}
      </Button>
      {isDeleteShown && (
        <Button
          onClick={onDeleteHandler}
          className="grid w-24 place-items-center"
          disabled={isDeleteDisabled}>
          {isDeleting ? <SpinnerIcon /> : 'Delete'}
        </Button>
      )}
    </div>
  );
}

export default DetailsToolbarView;
