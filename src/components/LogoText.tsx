import React, { FC } from "react";
import { Icon } from "../atoms/Icon";
import Link from "next/link";

interface LogoTextProps {}

export const LogoText: FC<LogoTextProps> = (props) => {
  return (
    <Link href="/">
      <a className="flex items-center w-fit-content">
        <Icon icon="logo" size="small" />
        <span className="ml-3 text-md md:text-lg font-medium">Pebbles</span>
      </a>
    </Link>
  );
};
