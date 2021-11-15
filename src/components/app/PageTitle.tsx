interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h1 className="text-lg font-medium text-black">{title}</h1>;
};
