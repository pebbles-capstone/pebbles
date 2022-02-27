import { useState } from "react";
import { Button } from "../../atoms/Button";
import { ProjectPanel } from "./ProjectPanel";
import { PastProject } from "../../types";

interface ProjectRatingOverlayProps {
  projects: PastProject[];
  isShown: boolean;
  toggleIsShown: () => void;
}

export const ProjectRatingOverlay: React.FC<ProjectRatingOverlayProps> = (
  props
) => {
  const { projects, isShown, toggleIsShown } = props;

  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    if (currentProject < projects.length - 1)
      setCurrentProject((prev) => prev + 1);
  };

  const likeProject = () => {
    console.log("liked this project");
    nextProject();
  };

  const dislikeProject = () => {
    console.log("disliked this project");
    nextProject();
  };

  const finishRating = (e: any) => {
    e.stopPropagation();
    console.log("finish rating");
    toggleIsShown();
  };

  if (!isShown) return null;

  return (
    <div
      className="w-screen h-screen bg-black bg-opacity-80 z-50 fixed top-0 left-0 flex flex-col justify-center items-center p-6"
      onClick={toggleIsShown}
    >
      <ProjectPanel
        project={projects[currentProject]}
        isPreview={false}
        like={likeProject}
        dislike={dislikeProject}
      />
      <Button
        text="Finish rating"
        size="sm"
        ariaLabel="Finish rating"
        isLink={false}
        isInternal={false}
        onClick={finishRating}
        style="border-primary"
        className="pointer-events-auto shadow-md mt-8"
      />
    </div>
  );
};
