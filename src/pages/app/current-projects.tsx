import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { TablePanel } from "../../components/app/TablePanel";
import { PastProject, CurrentProject } from "../../types";
import { withAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";

const currentProjects: CurrentProject[] = [
  {
    title: "Identify fake e-commerce goods using hard tokens",
    supervisor: "Supervisor Name",
    description: `You probably have used an app that generates a number of 6-8 digits to login to an account. That's called a soft token. A hard token is an offline flash-drive-sized device that generates a sequence of numbers based on a hash function similar to a soft token but without being connected to the internet! It's also used for authentication. The idea is to build a hard token with NFC capability to be imbedded in authentic e-commerce products. When the buyer purchases a product online, the seller taps the product with their phone, an app then verifies the authenticity of the product based on the hard token number and transitions ownership to the buyer, the new ownership certificate is then uploaded to a website (like eBay) as a proof of purchase.`,
  },
  {
    title:
      "A bird-eye view visual debugger of software that minimizes the time needed to understand a complex/new codebase",
    supervisor: "Supervisor Name",
    description:
      "If you worked as a software engineer, you probably had to go through a learning curve to familiarize yourself with the company's codebase. This onboarding process can take weeks to months! The idea is to build a tool that understands the codebase structure and visualize it as a graph, it will also allow the developer to debug the code by monitoring the execution of the code as info flowing on arrows from a graph node to another.",
  },
  {
    title:
      "Matching Application to help connect students and professors for projects",
    supervisor: "Zeb Tate",
    description:
      "Finding teams, projects, and professors for Capstone is a difficult and stressful task. The project's goal is to create a matching application used by students and professors to help form student + professor teams that are interested in similar things based on the individual's likeness for past projects.",
  },
  {
    title: "Project Name",
    supervisor: "Supervisor Name",
    description:
      "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.	",
  },
  {
    title: "Project Name",
    supervisor: "Supervisor Name",
    description:
      "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.	",
  },
  {
    title: "Project Name",
    supervisor: "Supervisor Name",
    description:
      "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.	",
  },
];

const CurrentProjects: NextPage<AuthPage> = ({ user }) => {
  const rows = currentProjects.map((project) => {
    return [project.title, project.supervisor, project.description];
  });

  return (
    <AppView name={user.name} width="wide">
      <PageTitle title="View all the current posted projects by supervisors already sorted based on what we think you'll like!" />
      <ContentBox
        title="How we sort"
        description="The current projects are sorted based on the information you entered when signing up and how you rated past projects."
      />
      <TablePanel
        title="Current Projects"
        columns={["Title", "Supervisor", "Description"]}
        rows={rows}
        customGridStyle="ProjectsTable"
      />
    </AppView>
  );
};

export const getServerSideProps = async (context: any) => {
  const user = await withAuth(context);

  if (!user) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  return {
    props: {
      user: user,
    }, // will be passed to the page component as props
  };
};

export default CurrentProjects;
