import { Icon } from "../atoms/Icon";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="w-full max-w-screen-2xl px-16 py-4 my-4 flex items-end justify-between">
      <Icon icon="logo" size="large" />
      <p>Pebbles by Krishna, Nish, Sam, and Udit</p>
    </footer>
  );
};
