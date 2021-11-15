import { Menu } from "./Menu";
import { LogoText } from "../LogoText";

interface AppViewProps {
  children: React.ReactNode | null;
  name: string;
}

export const AppView: React.FC<AppViewProps> = ({ children, name }) => {
  return (
    <div className="AppView w-screen relative grid bg-grey-light">
      <Menu name={name} />
      <div className="hidden sm:block"></div>
      <main className="w-full mb-4 md:mb-0 min-h-fit-content md:min-h-screen mt-16 md:mt-0 p-4 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-3xl grid grid-cols-1 gap-y-8">
          {children}
        </div>
      </main>
    </div>
  );
};
