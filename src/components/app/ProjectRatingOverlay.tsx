import { useState } from "react";
import { Button } from "../../atoms/Button";
import { ProjectPanel } from "./ProjectPanel";
import { PastProject } from "../../types";
import { useAuth } from "../../contexts/Auth";
import api from "../../lib/api";
import { User } from "../../types";

interface ProjectRatingOverlayProps {
  projects: PastProject[];
  isShown: boolean;
  toggleIsShown: () => void;
}

export const ProjectRatingOverlay: React.FC<ProjectRatingOverlayProps> = (
  props
) => {
  const { user, updateCurrentUser } = useAuth();
  const { projects, isShown, toggleIsShown } = props;
  const [projectsRated, setProjectsRated] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    if (currentProject < projects.length - 1)
      setProjectsRated((prev) => prev + 1);
    setCurrentProject((prev) => prev + 1);
  };

  const likeProject = () => {
    if (!!user?.data.interestVector && !!projects[currentProject].interests) {
      let userCopy = user;
      userCopy.data.interestVector = (
        userCopy?.data.interestVector as number[]
      ).map((interest, i) => {
        if ((projects[currentProject].interests as number[])[i] === 1) {
          return interest + 1;
        } else {
          return interest;
        }
      }) as number[];

      console.log(userCopy);
      updateCurrentUser(userCopy);

      nextProject();
    }
  };

  const dislikeProject = () => {
    nextProject();
  };

  const finishRating = async (e: any) => {
    e.stopPropagation();
    console.log("finish rating");

    const userCopy = user;
    userCopy!.data.projectCount = projectsRated;
    updateCurrentUser(userCopy!);

    const updateUserInterests = await api.postUser(
      user?.id as string,
      user as User
    );
    console.log(updateUserInterests);
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
