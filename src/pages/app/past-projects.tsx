import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { ProjectPanel } from "../../components/app/ProjectPanel";
import { PastProject } from "../../types";

interface MockUser {
  name: string;
  email: string;
}

interface AuthPage {
  user: MockUser;
}

const mockProject: PastProject = {
  title: "Project Name",
  supervisor: "Supervisor Name",
  numOfStudents: 4,
  description:
    "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.	",
};

const PastProjects: NextPage<AuthPage> = ({ user }) => {
  const like = () => {
    console.log("liked");
  };

  const dislike = () => {
    console.log("disliked");
  };

  return (
    <AppView name={user.name}>
      <PageTitle title="Like/dislike a project so we can understand what you’re interested in and match you with others!" />
      <ProjectPanel project={mockProject} like={like} dislike={dislike} />
      <div className="w-full grid grid-cols-1  gap-x-8 gap-y-8">
        <ContentBox title="Project Rating Progress">
          <div className="flex flex-col">
            <p>You've rated</p>
            <p className="text-xxxl">18/100</p>
            <p>past projects so far,</p>
            <p className="mt-4">
              We reccomend rating atleast 20 past projects to get accurate
              teammate suggestions. However, the more you can do, the better!
            </p>
          </div>
        </ContentBox>
      </div>
    </AppView>
  );
};

export const getServerSideProps = async (context) => {
  // boolean to control if someone is logged in or not atm
  const loggedIn = true;

  if (!loggedIn) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  return {
    // will be passed to the page component as props
    props: {
      user: {
        name: "Udit Desai",
        email: "udit.desai3@gmail.com",
      },
    },
  };
};

export default PastProjects;
