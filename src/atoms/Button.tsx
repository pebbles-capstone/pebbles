import Link from "next/link";

interface ButtonProps {
  text: string;
  ariaLabel: string;
  isLink: boolean;
  isInternal: boolean;
  onClick?: () => void;
  link?: string;
  size: "sm" | "md" | "lg";
  type: "border-primary" | "border-secondary" | "outline" | "blank";
  className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    ariaLabel,
    isLink,
    isInternal,
    onClick,
    link,
    size,
    type,
    className,
  } = props;

  const standardStyle = `
    font-sans-serif text-sans-serif-md rounded 
    ${type === "border-primary" ? "bg-blue text-white px-4 py-2" : ""}
    ${type === "border-secondary" ? "bg-grey text-black px-4 py-2" : ""}
    ${type === "outline" ? "border-2 border-black px-4 py-2" : ""}
    ${type === "blank" ? "p-0 color-black" : ""}
    ${className}
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
      <button onClick={onClick} className={standardStyle}>
        {text}
      </button>
    );
  }
};
