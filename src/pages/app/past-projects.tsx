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
    <AppView name={currentUser?.name!} width="standard">
      {!loadingProjects && !loadingUser ? (
        <>
          {projectCount !== pastProjects.length - 1 ? (
            <>
              <ProjectRatingOverlay
                projects={pastProjects}
                isShown={projectRatingVisible}
                toggleIsShown={toggleProjectRating}
                projectsRatedSoFar={projectCount}
              />
              <PageTitle title="Like/dislike a project so we can understand what you’re interested in and match you with others!" />
              <ProjectPanel
                project={pastProjects[currentUser?.data.projectCount as number]}
                isPreview={true}
                previewClick={toggleProjectRating}
              />
              <ContentBox title="Project Rating Progress">
                <div className="flex flex-col">
                  <p>You&apos;ve rated</p>
                  <p className="text-xxxl">
                    {currentUser?.data.projectCount}/{pastProjects.length - 1}
                  </p>
                  <p>past projects so far,</p>
                  <p className="mt-4">
                    We reccomend rating atleast 20 past projects to get accurate
                    teammate suggestions. However, the more you can do, the
                    better!
                  </p>
                </div>
              </ContentBox>
            </>
          ) : (
            <>
              <PageTitle title="You've rated all past projects! Below is a list of all the projects you've rated in case you want to look them over." />
            </>
          )}
        </>
      ) : null}
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
