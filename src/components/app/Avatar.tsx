interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const nameParts = name.split(" ");
  const namePartLetters = nameParts.map((part) => part[0]);
  const letters = namePartLetters.join("");

  return (
    <div className="h-8 w-8 rounded-full bg-blue-dark flex justify-center items-center">
      <span className="text-white leading-relaxed">{letters}</span>
    </div>
  );
};
