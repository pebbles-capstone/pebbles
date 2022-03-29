import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { PageTitle } from "../../components/app/PageTitle";
import { AccountEdit } from "../../components/app/AccountEdit";
import { withAuth, useAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";

const AppAccount: NextPage<AuthPage> = () => {
  const { user, updateCurrentUser } = useAuth();

  return (
    <AppView name={user?.name!} width="standard">
      <PageTitle title="Account" />
      {user && <AccountEdit user={user} updateUser={updateCurrentUser} />}
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
