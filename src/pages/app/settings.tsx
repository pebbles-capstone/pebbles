import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { PageTitle } from "../../components/app/PageTitle";
import { withAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";

const AppAccount: NextPage<AuthPage> = ({ user }) => {
  return (
    <AppView name={user.name} width="standard">
      <PageTitle title="Settings" />
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

export default AppAccount;
