function FormGroup({ children, label }) {
  return (
    <div className="mx-6 mb-6">
      <label className="block mb-2 font-semibold dark:text-white">
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormGroup;
