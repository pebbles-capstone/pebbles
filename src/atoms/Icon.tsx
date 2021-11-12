import React, { FC } from "react";
import { Icons, IconType } from "./Icons";

type Variation = "active" | "hover" | "default";
type Size = "small" | "medium" | "large" | "default";

type Props = {
  icon: IconType;
  size?: Size;
  variation?: Variation;
  className?: string;
};

const getIconMarkup = (icon: IconType): React.ReactNode => {
  return React.createElement(Icons[icon]);
};

export const Icon: FC<Props> = ({
  icon,
  size = "default",
  variation,
  className = "",
}) => {
  const kebabCaseName = icon.replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`
  );

  const standardStyle = `
    Icon Icon--${kebabCaseName} ${className}
    ${!!variation ? `Icon--${kebabCaseName}--${variation}` : ""}
    ${size !== "default" ? `Icon--${kebabCaseName}-size-${size}` : ""}
  `;

  return <div className={standardStyle}>{getIconMarkup(icon)}</div>;
};
