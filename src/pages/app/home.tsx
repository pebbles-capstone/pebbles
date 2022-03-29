import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { withAuth, useAuth } from "../../contexts/Auth";
import { AuthPage, PastProject } from "../../types";
import api from "../../lib/api";

const AppHome: NextPage<AuthPage> = () => {
  const { user } = useAuth();

  const [pastProjects, setPastProjects] = useState<PastProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const getPastProjects = async () => {
      const pastProjects: any = await api.getProjects();
      console.log(pastProjects);
      setPastProjects(pastProjects);
      setLoadingProjects(false);
    };

    getPastProjects();
  }, []);

  return (
    <AppView name={user?.name!} width="standard">
      <PageTitle
        title={`Good morning ${user?.name}, check out your progress below.`}
      />
      {!loadingProjects &&
      !!user &&
      user.data.projectCount !== pastProjects.length - 1 ? (
        <ContentBox
          title={
            user.data.projectCount === 0
              ? "Start rating past projects"
              : "Continue rating past projects"
          }
          description="By liking/disliking past projects, we can determine what types of projects interest you and can help suggest teammates who have similar interests and likings."
          hasButton={true}
          buttonText={
            user.data.projectCount === 0 ? "Start rating" : "Continue rating"
          }
          buttonIsLink={true}
          buttonIsInternal={true}
          buttonLink="/app/past-projects"
        >
          <div className="flex flex-col">
            <p>You&apos;ve rated</p>
            <p className="text-xxxl">
              {user.data.projectCount}/{pastProjects.length - 1}
            </p>
            <p>past projects so far,</p>
            <p className="mt-4">
              We reccomend rating atleast 20 past projects to get accurate
              teammate suggestions. However, the more you can do, the better!
            </p>
          </div>
        </ContentBox>
      ) : (
        <ContentBox
          title="You've rated all past projects!"
          description="We should be able to match you with teammates and supervisors who have similar interests. See the options below!"
        />
      )}
      {!!user && user?.data?.projectCount === 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <ContentBox
            title="Potential teammates"
            description="This page will open when yourself and other students will have rated enough past projects for us to effectively suggest teammates."
            hasButton={true}
            buttonText="Start rating"
            buttonIsLink={true}
            buttonIsInternal={true}
            buttonLink="/app/past-projects"
          />
          <ContentBox
            title="Potential supervisors"
            description="This page will open when yourself and professors will have rated enough past projects for us to effectively suggest professors."
            hasButton={true}
            buttonText="Start rating"
            buttonIsLink={true}
            buttonIsInternal={true}
            buttonLink="/app/past-projects"
          />
        </div>
      )}
      {!!user && user !== null && user?.data?.projectCount! > 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <ContentBox
            title="Potential teammates"
            description="View a list of potential teammates sorted based on matching interests."
            hasButton={true}
            buttonText="View potential teammates"
            buttonIsLink={true}
            buttonIsInternal={true}
            buttonLink="/app/potential-teammates"
          />
          <ContentBox
            title="Potential supervisors"
            description="View a list of potential teammates sorted based on matching interests."
            hasButton={true}
            buttonText="View potential supervisors"
            buttonIsLink={true}
            buttonIsInternal={true}
            buttonLink="/app/supervisors"
          />
        </div>
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

export default AppHome;
