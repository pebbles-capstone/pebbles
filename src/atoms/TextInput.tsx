interface TextInputProps {
  label?: string;
  id: string;
  type: "text" | "email" | "password";
  error?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    label,
    id,
    onChange,
    type,
    inputClassName,
    wrapperClassName,
    value,
    name,
    error,
    placeholder,
  } = props;

  const wrapperStyle = `
    w-full max-w-sm 
    ${wrapperClassName}
  `;

  const inputStyle = `
    w-full rounded bg-grey-light text-black text-base p-2 font-normal
    ${inputClassName}
    ${error ? "border border-red" : ""}
  `;

  return (
    <div className={wrapperStyle}>
      {label ? (
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
      ) : null}
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyle}
        id={id}
      />
      {error ? (
        <span className="text-red mt-1 inline-block">{error}</span>
      ) : null}
    </div>
  );
};
