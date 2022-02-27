interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const nameParts = name.split(" ");
  const namePartLetters = nameParts.map((part) => part[0]);
  const letters = namePartLetters.join("");

  return (
    <div className="h-12 w-12 rounded-full bg-blue-dark flex justify-center items-center flex-shrink-0">
      <span className="text-white leading-relaxed text-lg">{letters}</span>
    </div>
  );
};
