import { Button } from "../../atoms/Button";
import { PastProject } from "../../types";

interface ProjectPanelProps {
  project: PastProject;
  like?: () => void;
  dislike?: () => void;
  isPreview: boolean;
  previewClick?: () => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = (props) => {
  const { project, like, dislike, isPreview, previewClick } = props;
  const { title, supervisor, numOfStudents, description } = project;

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`w-full max-w-3xl p-6 flex flex-col bg-grey-dark rounded-md shadow-md relative ${
        isPreview && "pointer-events-none"
      }`}
      onClick={preventDefault}
    >
      {isPreview && (
        <div className="w-full h-full absolute top-0 left-0 bg-green-light bg-opacity-90 rounded-md grid place-items-center">
          <Button
            text="Rate projects"
            size="sm"
            ariaLabel="Rate projects"
            isLink={false}
            isInternal={false}
            onClick={previewClick}
            style="border-primary"
            className="text-lg pointer-events-auto shadow-md"
          />
        </div>
      )}
      <div className="w-full p-6 flex flex-col bg-white rounded-md">
        <h2 className="text-xxl mb-3 max-w-3xl">{title}</h2>
        <p className="text-md mb-3 text-black max-w-3xl">
          <span className="text-grey-darker">Supervisor:</span> {supervisor}
        </p>
        <p className="text-md max-w-3xl">
          <span className="text-grey-darker"># of students:</span>{" "}
          {numOfStudents}
        </p>
        <p className="text-md mt-8 max-w-3xl">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-6">
        <Button
          text="I don't like this one"
          size="sm"
          ariaLabel="Dislike Project"
          isLink={false}
          isInternal={false}
          onClick={dislike}
          style="border-red"
        />
        <Button
          text="I like this one"
          size="sm"
          ariaLabel="Like Project"
          isLink={false}
          isInternal={false}
          onClick={like}
          style="border-primary"
        />
      </div>
    </div>
  );
};
