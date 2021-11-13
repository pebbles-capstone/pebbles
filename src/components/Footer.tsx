import { Icon } from "../atoms/Icon";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="w-full max-w-screen-2xl px-4 md:px-16 py-4 md:my-4 flex items-end justify-between">
      <Icon icon="logo" size="medium" />
      <p className="w-1/2 text-right">
        Pebbles by Krishna, Nish, Sam, and Udit
      </p>
    </footer>
  );
};
