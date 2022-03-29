import React, { useEffect, useState } from "react";
interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const [letters, setLetters] = useState("");

  useEffect(() => {
    if (name) {
      const nameParts = name.split(" ");
      const namePartLetters = nameParts.map((part) => part[0]);
      setLetters(namePartLetters.join(""));
    }
  }, [name]);

  return (
    <div className="h-12 w-12 rounded-full bg-blue-dark flex justify-center items-center flex-shrink-0">
      <span className="text-white leading-relaxed text-lg">{letters}</span>
    </div>
  );
};
