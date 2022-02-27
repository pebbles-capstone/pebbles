import { useEffect, useState } from "react";
import { LogoText } from "../LogoText";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../atoms/Button";
import { Avatar } from "./Avatar";
import { Icon } from "../../atoms/Icon";
import { IconButton } from "../../atoms/IconButton";
import { useAuth } from "../../contexts/Auth";

interface MenuProps {
  name: string;
}

export const Menu: React.FC<MenuProps> = ({ name }) => {
  const router = useRouter();
  const { signOutUser } = useAuth();

  const signOut = async () => {
    const result = await signOutUser();
    if (result) router.push("/");
    else {
      console.log("error signing out");
    }
  };

  const [currentTab, setCurrentTab] = useState(-1);

  const switchTab = (tabNum: number) => {
    setCurrentTab(tabNum);
  };

  const currentPath = router.pathname;

  useEffect(() => {
    if (currentPath === "/app/home") switchTab(0);
    else if (
      currentPath === "/app/past-projects" ||
      currentPath === "/app/current-projects"
    )
      switchTab(1);
    else if (
      currentPath === "/app/potential-teammates" ||
      currentPath === "/app/team"
    )
      switchTab(2);
    else if (currentPath === "/app/supervisors") switchTab(3);
    else switchTab(-1);
  }, [currentPath]);

  // menu open/close logic for mobile
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => {
    if (isOpen) closeMenu();
    else openMenu();
  };

  const currentPathStyle =
    "bg-grey-light px-4 py-2 rounded-md mb-1 flex items-center w-full";

  const generalPathStyle =
    "px-4 py-2 rounded-md mb-1 flex items-center w-full transition hover:bg-grey-light hover:bg-opacity-50";

  const currentNestedPathStyle =
    "px-4 py-2 rounded-md flex items-center w-full";

  return (
    <nav
      className={`AppMenu grid w-full sm:w-60 md:w-72 ${
        isOpen
          ? "h-screen"
          : "h-fit-content AppMenu--closed shadow md:shadow-none"
      } sm:h-screen fixed z-40 top-0 left-0 p-4 md:px-8 md:py-6 bg-white`}
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
          className="md:hidden"
        ></IconButton>
      </div>
      <div className={`${isOpen ? "" : "hidden"} sm:block`}>
        <ul className="border-b border-grey pb-2 mb-4">
          <li>
            <Link href="/app/home">
              <a
                className={`text-base font-medium w-full ${
                  currentTab === 0 ? currentPathStyle : generalPathStyle
                }`}
              >
                Home
              </a>
            </Link>
          </li>
          <li className="flex-col justify-start">
            <>
              <Link href="/app/past-projects">
                <a
                  className={`text-base font-medium w-full  ${
                    currentTab === 1 ? currentNestedPathStyle : generalPathStyle
                  }`}
                >
                  Projects
                </a>
              </Link>
              {currentTab === 1 ? (
                <ul className="list-outside w-full pl-6">
                  <li>
                    <Link href="/app/past-projects">
                      <a
                        className={`text-base w-full ${
                          currentPath === "/app/past-projects"
                            ? currentPathStyle
                            : generalPathStyle
                        }`}
                      >
                        Past Projects
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/app/current-projects">
                      <a
                        className={`text-base w-full ${
                          currentPath === "/app/current-projects"
                            ? currentPathStyle
                            : generalPathStyle
                        }`}
                      >
                        Current Projects
                      </a>
                    </Link>
                  </li>
                </ul>
              ) : null}
            </>
          </li>
          <li className="flex-col justify-start">
            <Link href="/app/potential-teammates">
              <a
                className={`text-base font-medium w-full ${
                  currentTab === 2 ? currentNestedPathStyle : generalPathStyle
                }`}
              >
                Teammates
              </a>
            </Link>
            {currentTab === 2 ? (
              <ul className="list-outside w-full pl-6">
                <li>
                  <Link href="/app/potential-teammates">
                    <a
                      className={`${
                        currentPath === "/app/potential-teammates"
                          ? currentPathStyle
                          : generalPathStyle
                      } text-base w-full`}
                    >
                      Potential Teammates
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/app/team">
                    <a
                      className={`${
                        currentPath === "/app/team"
                          ? currentPathStyle
                          : generalPathStyle
                      } text-base w-full`}
                    >
                      Your Team
                    </a>
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <Link href="/app/supervisors">
              <a
                className={`${
                  currentTab === 3 ? currentPathStyle : generalPathStyle
                } text-base font-medium w-full`}
              >
                Supervisors
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/app/account">
              <a
                className={`${
                  currentPath === "/app/account"
                    ? currentPathStyle
                    : generalPathStyle
                } text-base font-medium w-full`}
              >
                Account
              </a>
            </Link>
          </li>
          <li>
            <Link href="/app/settings">
              <a
                className={`${
                  currentPath === "/app/settings"
                    ? currentPathStyle
                    : generalPathStyle
                } text-base font-medium w-full`}
              >
                Settings
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`${isOpen ? "flex" : "hidden"} flex-col justify-end sm:flex`}
      >
        <Link href="/app/account">
          <a className="flex flex-col">
            <Avatar name={name} />
            <p className="text-md font-medium mt-2">{name}</p>
          </a>
        </Link>
        <Button
          style="border-secondary"
          text="Sign out"
          ariaLabel="Sign out"
          isLink={false}
          isInternal={false}
          onClick={signOut}
          size="sm"
          className="mt-4"
        />
      </div>
    </nav>
  );
};
