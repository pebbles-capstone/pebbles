import { LogoText } from "../LogoText";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../atoms/Button";
import { Avatar } from "./Avatar";

interface MenuProps {
  name: string;
}

export const Menu: React.FC<MenuProps> = ({ name }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const currentPathStyle =
    "bg-grey-light px-4 py-2 rounded-md mb-2 focus-within:outline-black";

  const generalPathStyle =
    "px-4 py-2 rounded-md mb-2 focus-within:outline-black";

  return (
    <nav className="AppMenu grid w-72 h-screen fixed top-0 left-0 px-8 py-6 bg-white">
      <LogoText />
      <div>
        <ul className="border-b border-grey pb-2 mb-4">
          <li
            className={
              currentPath === "/app/home" ? currentPathStyle : generalPathStyle
            }
          >
            <Link href="/app/home">
              <a className="text-md font-medium focus:outline-none">Home</a>
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
              <a className="text-md font-medium focus:outline-none">Projects</a>
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
              <a className="text-md font-medium focus:outline-none">
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
              <a className="text-md font-medium focus:outline-none">
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
              <a className="text-md font-medium focus:outline-none">
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
              <a className="text-md font-medium focus:outline-none">Account</a>
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
              <a className="text-md font-medium focus:outline-none">Settings</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-end">
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
