import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { useAuth } from "../../contexts/Auth";
import { useRouter } from "next/router";

interface AuthPage {}

const AppHome: NextPage<AuthPage> = () => {
  const router = useRouter();
  const { loadingUser, user } = useAuth();

  console.log(loadingUser, user);

  if (loadingUser) return null;

  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <AppView name={"Udit Desai"} width="standard">
      <PageTitle title="Good morning Udit, check out your progress below." />
      <ContentBox
        title="Start rating past projects"
        description="By liking/disliking past projects, we can determine what types of projects interest you and can help suggest teammates who have similar interests and likings."
        hasButton={true}
        buttonText="Start rating"
        buttonIsLink={true}
        buttonIsInternal={true}
        buttonLink="/app/past-projects"
      >
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
    </AppView>
  );
};

export const getServerSideProps = async (context) => {
  // boolean to control if someone is logged in or not atm
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

export default AppHome;
