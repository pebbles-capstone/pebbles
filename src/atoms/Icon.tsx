import React, { FC } from "react";
import { Icons, IconType } from "./Icons";

type Variation = "active" | "hover" | "default";
export type IconSize = "small" | "medium" | "large" | "default";

interface IconProps {
  icon: IconType;
  size?: IconSize;
  variation?: Variation;
  className?: string;
}

const getIconMarkup = (icon: IconType): React.ReactNode => {
  return React.createElement(Icons[icon]);
};

export const Icon: FC<IconProps> = ({
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
