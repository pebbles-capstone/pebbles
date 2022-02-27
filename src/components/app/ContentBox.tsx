import { Button } from "../../atoms/Button";

interface ContentBoxProps {
  title: string;
  description?: string;
  hasButton?: boolean;
  buttonText?: string;
  buttonIsLink?: boolean;
  buttonIsInternal?: boolean;
  buttonOnClick?: () => void;
  buttonLink?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ContentBox: React.FC<ContentBoxProps> = (props) => {
  const {
    title,
    description,
    buttonText,
    buttonIsLink,
    buttonIsInternal,
    buttonOnClick,
    buttonLink,
    children,
    hasButton,
    className = "",
  } = props;

  let text: string;
  let isLink: boolean;
  let isInternal: boolean;
  let onClick: () => void;
  let link: string;
  let button = <></>;
  if (hasButton) {
    text = buttonText!;
    isLink = buttonIsLink!;
    isInternal = buttonIsInternal!;
    onClick = buttonOnClick!;
    link = buttonLink!;

    button = (
      <Button
        text={text}
        size="sm"
        ariaLabel={text}
        isLink={isLink}
        isInternal={isInternal}
        onClick={buttonOnClick}
        link={buttonLink}
        style="border-primary"
      />
    );
  }

  return (
    <div
      className={`w-full p-6 flex flex-col bg-white rounded-md shadow-md ${className}`}
    >
      <h2 className="text-md font-medium mb-4 max-w-3xl">{title}</h2>
      {description ? (
        <p
          className={`text-base max-w-3xl ${
            hasButton || children ? "mb-4" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
      {children ? (
        <div className={`w-full ${hasButton ? "mb-4" : ""}`}>{children}</div>
      ) : null}
      {hasButton ? button : null}
    </div>
  );
};
