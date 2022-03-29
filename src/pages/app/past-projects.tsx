import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { ProjectPanel } from "../../components/app/ProjectPanel";
import { PastProject } from "../../types";
import { withAuth } from "../../contexts/Auth";
import { useAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";
import { ProjectRatingOverlay } from "../../components/app/ProjectRatingOverlay";
import api from "../../lib/api";

const mockProject: PastProject = {
  title: "Project Name",
  supervisor: "Supervisor Name",
  numOfStudents: 4,
  description:
    "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.",
};

const mockProject2: PastProject = {
  title: "Project Name 2",
  supervisor: "Supervisor Name 2",
  numOfStudents: 3,
  description:
    "An online platform allows sitters to offer babysitting/day-care services to parents. The sitters can list down their specific offers and parents can search for sitters that suit their specific needs.",
};

const PastProjects: NextPage<AuthPage> = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [projectRatingVisible, setProjectRatingVisible] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [pastProjects, setPastProjects] = useState<PastProject[]>([]);
  const [projectCount, setProjectCount] = useState(0);

  const toggleProjectRating = () => {
    setProjectRatingVisible((prev) => !prev);
  };

  useEffect(() => {
    const getPastProjects = async () => {
      const pastProjects: any = await api.getProjects();
      console.log(pastProjects);
      setPastProjects(pastProjects);
      setLoadingProjects(false);
    };

    getPastProjects();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLoadingUser(false);
      setProjectCount(currentUser.data.projectCount as number);
    }
  }, [currentUser]);

  return (
    <AppView name={user.name} width="standard">
      {!loadingProjects && (
        <ProjectRatingOverlay
          projects={pastProjects}
          isShown={projectRatingVisible}
          toggleIsShown={toggleProjectRating}
        />
      )}
      <PageTitle title="Like/dislike a project so we can understand what you’re interested in and match you with others!" />
      {!loadingProjects && !loadingUser && (
        <ProjectPanel
          project={pastProjects[currentUser?.data.projectCount as number]}
          isPreview={true}
          previewClick={toggleProjectRating}
        />
      )}
      {!loadingProjects && !loadingUser && (
        <ContentBox title="Project Rating Progress">
          <div className="flex flex-col">
            <p>You&apos;ve rated</p>
            <p className="text-xxxl">
              {currentUser?.data.projectCount}/{pastProjects.length}
            </p>
            <p>past projects so far,</p>
            <p className="mt-4">
              We reccomend rating atleast 20 past projects to get accurate
              teammate suggestions. However, the more you can do, the better!
            </p>
          </div>
        </ContentBox>
      )}
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

export default PastProjects;
