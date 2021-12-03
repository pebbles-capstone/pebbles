import { Button } from "../../atoms/Button";
import { PastProject } from "../../types";

interface ProjectPanelProps {
  project: PastProject;
  like: () => void;
  dislike: () => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = (props) => {
  const { project, like, dislike } = props;
  const { title, supervisor, numOfStudents, description } = project;

  return (
    <div className="w-full p-6 flex flex-col bg-grey-dark rounded-md shadow-md">
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
          text="Dislike Project"
          size="sm"
          ariaLabel="Dislike Project"
          isLink={false}
          isInternal={false}
          onClick={dislike}
          style="border-red"
        />
        <Button
          text="Like Project"
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