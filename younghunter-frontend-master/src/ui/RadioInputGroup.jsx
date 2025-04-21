import RadioInput from "./RadioInput";

function RadioInputGroup({ register, watch, errors, configs }) {
  const { name, validationSchema = {}, options } = configs;

  return (
    <>
      <div className="flex items-center justify-center gap-x-20 text-neutral-200">
        {options.map(({ label, value }) => (
          <RadioInput
            key={value}
            label={label}
            value={value}
            id={value.toString()}
            name={name}
            register={register}
            watch={watch}
            validationSchema={validationSchema}
            errors={errors}
          />
        ))}
      </div>
      <div>
        {errors && errors[name] && (
          <span className="text-red-600 block text-sm mt-2">
            {errors[name]?.message}
          </span>
        )}
      </div>
    </>
  );
}

export default RadioInputGroup;
