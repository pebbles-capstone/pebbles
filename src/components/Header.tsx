import { Icon } from "../atoms/Icon";
import { Button } from "../atoms/Button";
import Link from "next/link";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <nav className="w-full h-20 border-b border-blue-light flex items-center sticky top-0 left-0 bg-white">
      <div className="w-full max-w-screen-2xl px-4 md:px-16 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <Icon icon="logo" size="small" />
            <span className="ml-3 text-md md:text-lg font-medium">Pebbles</span>
          </a>
        </Link>
        <div>
          <Button
            type="blank"
            size="sm"
            isLink={true}
            isInternal={true}
            link="/signin"
            ariaLabel="Sign in"
            text="Sign in"
            className="mr-6"
          />
          <Button
            type="border-primary"
            size="sm"
            isLink={true}
            isInternal={true}
            link="/signup"
            ariaLabel="Sign in"
            text="Sign up"
          />
        </div>
      </div>
    </nav>
  );
};
