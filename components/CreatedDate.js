function CreatedDate({ value }) {
  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return date.toUTCString();
  };

  return (
    value && (
      <p className="mx-6 mb-6 text-sm text-base-400 dark:text-base-500">
        Created on {formatDate(value)}
      </p>
    )
  );
}

export default CreatedDate;
