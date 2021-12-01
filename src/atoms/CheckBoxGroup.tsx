interface CheckBoxGroupProps {
  legend: string;
  error?: string;
  currentValues: string[];
  values: string[];
  labels: string[];
  name: string;
  onChange: (e: string | React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const CheckBoxGroup: React.FC<CheckBoxGroupProps> = (props) => {
  const {
    legend,
    error,
    currentValues,
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
    font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 mr-3 mt-3 cursor-pointer
    focus-within:ring-2
  `;

  const inputStyle = "w-0 h-0 focus:outline-none";

  return (
    <fieldset className={wrapperStyle}>
      <legend className="inline-block mb-2">{legend}</legend>
      <div className="flex flex-wrap max-w-sm -mt-3">
        {values.map((value, i) => {
          const label = labels[i];

          return (
            <label
              key={`${name}-${value}`}
              className={`${labelStyle} ${
                currentValues.includes(value)
                  ? "bg-blue text-white"
                  : "bg-grey text-black bg-opacity-30"
              }`}
            >
              <input
                type="checkbox"
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
