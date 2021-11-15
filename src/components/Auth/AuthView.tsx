import { Icon } from "../../atoms/Icon";
import { LogoText } from "../LogoText";

interface AuthViewProps {
  children: React.ReactNode | null;
}

export const AuthView: React.FC<AuthViewProps> = ({ children }) => {
  return (
    <main className="AuthView w-full h-screen max-h-screen grid">
      <div className="w-full h-fit-content md:h-full flex flex-col overflow-y-auto p-4 md:py-10 md:px-12">
        <LogoText />
        <div className="AuthView__children-wrapper pt-12 flex items-center md:mb-20">
          {children}
        </div>
      </div>
      <div className="AuthView__right-wrapper w-full h-full bg-red hidden md:grid place-items-center">
        <Icon icon="logo" size="large" />
      </div>
    </main>
  );
};
