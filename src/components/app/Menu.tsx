import { useState } from "react";
import { LogoText } from "../LogoText";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../atoms/Button";
import { Avatar } from "./Avatar";
import { Icon } from "../../atoms/Icon";
import { IconButton } from "../../atoms/IconButton";

interface MenuProps {
  name: string;
}

export const Menu: React.FC<MenuProps> = ({ name }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // menu open/close logic for mobile
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => {
    if (isOpen) closeMenu();
    else openMenu();
  };

  const currentPathStyle =
    "bg-grey-light px-4 py-2 rounded-md mb-2 focus-within:outline-black flex items-center w-full";

  const generalPathStyle =
    "px-4 py-2 rounded-md mb-2 focus-within:outline-black flex items-center w-full transition hover:bg-grey-light hover:bg-opacity-50";

  return (
    <nav
      className={`AppMenu grid w-full sm:w-56 md:w-64 ${
        isOpen ? "h-screen" : "h-fit-content AppMenu--closed"
      } md:h-screen fixed top-0 left-0 p-4 md:px-8 md:py-6 bg-white`}
    >
      <div className="w-full flex justify-between items-center">
        <LogoText />
        <IconButton
          icon="menu"
          size="small"
          isLink={false}
          isInternal={false}
          ariaLabel={isOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        ></IconButton>
      </div>
      <div className={isOpen ? "" : "hidden"}>
        <ul className="border-b border-grey pb-2 mb-4">
          <li
            className={
              currentPath === "/app/home" ? currentPathStyle : generalPathStyle
            }
          >
            <Link href="/app/home">
              <a className="text-base font-medium focus:outline-none w-full">
                Home
              </a>
            </Link>
          </li>
          <li
            className={
              currentPath === "/app/projects"
                ? currentPathStyle
                : generalPathStyle
            }
          >
            <Link href="/app/projects">
              <a className="text-base font-medium focus:outline-none w-full">
                Projects
              </a>
            </Link>
          </li>
          <li
            className={
              currentPath === "/app/teammates"
                ? currentPathStyle
                : generalPathStyle
            }
          >
            <Link href="/app/teammates">
              <a className="text-base font-medium focus:outline-none w-full">
                Teammates
              </a>
            </Link>
          </li>
          <li
            className={
              currentPath === "/app/your-team"
                ? currentPathStyle
                : generalPathStyle
            }
          >
            <Link href="/app/your-team">
              <a className="text-base font-medium focus:outline-none w-full">
                Your Team
              </a>
            </Link>
          </li>
          <li
            className={
              currentPath === "/app/supervisors"
                ? currentPathStyle
                : generalPathStyle
            }
          >
            <Link href="/app/supervisors">
              <a className="text-base font-medium focus:outline-none w-full">
                Supervisors
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          <li
            className={
              currentPath === "/app/account"
                ? currentPathStyle
                : generalPathStyle
            }
          >
            <Link href="/app/account">
              <a className="text-base font-medium focus:outline-none w-full">
                Account
              </a>
            </Link>
          </li>
          <li
            className={
              currentPath === "/app/settings"
                ? currentPathStyle
                : generalPathStyle
            }
          >
            <Link href="/app/settings">
              <a className="text-base font-medium focus:outline-none w-full">
                Settings
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${isOpen ? "flex" : "hidden"} flex-col justify-end`}>
        <Link href="/app/account">
          <a className="flex items-center">
            <Avatar name={name} />
            <p className="text-md font-medium ml-2">{name}</p>
          </a>
        </Link>
        <Button
          style="border-secondary"
          text="Sign out"
          ariaLabel="Sign out"
          isLink={false}
          isInternal={false}
          onClick={() => {}}
          size="sm"
          className="mt-4"
        />
      </div>
    </nav>
  );
};
