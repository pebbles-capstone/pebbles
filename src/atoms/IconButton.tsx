import Link from "next/link";
import { IconSize, Icon } from "../atoms/Icon";
import { IconType } from "./Icons";

interface IconButtonProps {
  icon: IconType;
  size: IconSize;
  ariaLabel: string;
  isLink: boolean;
  isInternal: boolean;
  onClick?: () => void;
  link?: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    size,
    ariaLabel,
    isLink,
    isInternal,
    onClick,
    link,
    className,
  } = props;

  // internal link using Next Link component
  if (isLink && isInternal && link) {
    return (
      <Link href={link}>
        <a>
          <Icon icon={icon} size={size} />
        </a>
      </Link>
    );
  }

  // external link using <a> tag
  else if (isLink && !isInternal && link) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <Icon icon={icon} size={size} />
      </a>
    );
  }

  // button with an onClick event handler
  else {
    return (
      <button onClick={onClick} type="button">
        <Icon icon={icon} size={size} />
      </button>
    );
  }
};
