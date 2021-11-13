import { Icon } from "../../atoms/Icon";
import Link from "next/link";
import { Button } from "../../atoms/Button";

interface AuthViewProps {
  children: React.ReactNode | null;
}

export const AuthView: React.FC<AuthViewProps> = ({ children }) => {
  return (
    <main className="AuthView w-full h-screen max-h-screen grid">
      <div className="w-full h-full flex flex-col overflow-y-auto py-10 px-12">
        <Link href="/">
          <a className="flex items-center">
            <Icon icon="logo" size="small" />
            <span className="ml-3 text-md md:text-lg font-medium">Pebbles</span>
          </a>
        </Link>
        <div className="AuthView__children-wrapper pt-12 flex items-center mb-20">
          {children}
        </div>
      </div>
      <div className="AuthView__right-wrapper w-full h-full bg-red grid place-items-center">
        <Icon icon="logo" size="large" />
      </div>
    </main>
  );
};
