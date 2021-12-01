interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h1 className="max-w-3xl text-lg font-medium text-black">{title}</h1>;
};
