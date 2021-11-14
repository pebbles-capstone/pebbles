interface RadioGroupProps {
  legend: string;
  error?: string;
  currentValue: string;
  values: [string, string];
  labels: [string, string];
  onChange: (e: string | React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    legend,
    error,
    currentValue,
    values,
    labels,
    onChange,
    name,
    className,
  } = props;

  const wrapperStyle = `
    flex flex-col 
    ${className}
  `;

  const labelStyle = `
    font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 mr-3 cursor-pointer
    focus-within:outline-black
  `;

  const inputStyle = "w-0 h-0 focus:outline-none";

  return (
    <fieldset className={wrapperStyle}>
      <legend className="inline-block mb-2">{legend}</legend>
      <div className="flex">
        {[0, 1].map((num) => {
          const label = labels[num];
          const value = values[num];

          return (
            <label
              key={`${name}-${value}`}
              className={`${labelStyle} ${
                value === currentValue
                  ? "bg-blue text-white"
                  : "bg-grey text-black bg-opacity-30"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
                className={inputStyle}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
