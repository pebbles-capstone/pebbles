import Link from "next/link";

interface ButtonProps {
  text: string;
  ariaLabel: string;
  isLink: boolean;
  isInternal: boolean;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  link?: string;
  size: "sm" | "md" | "lg";
  style:
    | "border-primary"
    | "border-secondary"
    | "border-red"
    | "outline"
    | "blank";
  type?: "submit";
  className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    ariaLabel,
    isLink,
    isInternal,
    onClick,
    disabled,
    link,
    size,
    type,
    style,
    className,
  } = props;

  const standardStyle = `
    font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content transition
    ${style === "border-primary" ? "bg-blue text-white px-4 py-2" : ""}
    ${style === "border-secondary" ? "bg-grey text-black px-4 py-2" : ""}
    ${style === "border-red" ? "bg-red text-black px-4 py-2" : ""}
    ${style === "outline" ? "border-2 border-black px-4 py-2" : ""}
    ${style === "blank" ? "p-0 color-black" : ""}
    ${className}
    ${disabled ? "cursor-not-allowed bg-opacity-40" : "hover:bg-opacity-90"}
  `;

  // internal link using Next Link component
  if (isLink && isInternal && link) {
    return (
      <Link href={link}>
        <a className={standardStyle}>{text}</a>
      </Link>
    );
  }

  // external link using <a> tag
  else if (isLink && !isInternal && link) {
    return (
      <a href={link} target="_blank" rel="noreferrer" className={standardStyle}>
        {text}
      </a>
    );
  }

  // button with an onClick event handler
  else {
    return (
      <button
        onClick={onClick}
        className={standardStyle}
        disabled={disabled}
        type={type ? type : "button"}
      >
        {text}
      </button>
    );
  }
};
