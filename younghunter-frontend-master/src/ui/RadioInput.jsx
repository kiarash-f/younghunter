function RadioInput({
  label,
  value,
  register,
  name,
  id,
  validationSchema,
  watch,
  errors,
}) {
  return (
    <>
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          {...register(name, validationSchema)}
          checked={watch(name) === value}
          className=""
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}

export default RadioInput;
