import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { PageTitle } from "../../components/app/PageTitle";
import { AccountEdit } from "../../components/app/AccountEdit";
import { withAuth } from "../../contexts/Auth";

interface MockUser {
  name: string;
  email: string;
}

interface AuthPage {}

const AppAccount: NextPage<AuthPage> = () => {
  return (
    <AppView name={"udit desai"} width="standard">
      <PageTitle title="Account" />
      <AccountEdit />
    </AppView>
  );
};

export const getServerSideProps = async (context: any) => {
  const user = await withAuth(context);

  if (!user) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default AppAccount;
