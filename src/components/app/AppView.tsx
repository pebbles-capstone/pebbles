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
      <div></div>
      <main className="w-full min-h-screen p-8">{children}</main>
    </div>
  );
};
