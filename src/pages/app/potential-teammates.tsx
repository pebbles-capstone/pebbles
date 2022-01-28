import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { withAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";

const PotentialTeammates: NextPage<AuthPage> = ({ user }) => {
  return (
    <AppView name={user.name} width="wide">
      <PageTitle title="Based on your project likings and everyone elses’, we suggest teaming with any of the following students!" />
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

export default PotentialTeammates;
