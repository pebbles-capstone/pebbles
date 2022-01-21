import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { TablePanel } from "../../components/app/TablePanel";
import { PastProject } from "../../types";
import { withAuth } from "../../contexts/Auth";

interface MockUser {
  name: string;
  email: string;
}

interface AuthPage {}

const mockProject: PastProject = {
  title: "Project Name",
  supervisor: "Supervisor Name",
  numOfStudents: 4,
  description:
    "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.	",
};

const CurrentProjects: NextPage<AuthPage> = () => {
  const like = () => {
    console.log("liked");
  };

  const dislike = () => {
    console.log("disliked");
  };

  return (
    <AppView name={"udit desai"} width="wide">
      <PageTitle title="View all the current posted projects by supervisors already sorted based on what we think you'll like!" />
      <ContentBox
        title="How we sort"
        description="The current projects are sorted based on the information you entered when signing up and how you rated past projects."
      />
      <TablePanel
        title="Current Projects"
        columns={["Title", "Supervisor", "Description"]}
        rows={[
          [
            "Project Title 1",
            "Supervisor 1",
            "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.",
          ],
          [
            "Project Title 2",
            "Supervisor 2",
            "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.",
          ],
        ]}
      />
    </AppView>
  );
};

export const getServerSideProps = async (context) => {
  const user = await withAuth(context);

  if (!user) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default CurrentProjects;
