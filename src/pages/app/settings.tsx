import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { PageTitle } from "../../components/app/PageTitle";

interface MockUser {
  name: string;
  email: string;
}

interface AuthPage {
  user: MockUser;
}

const AppAccount: NextPage<AuthPage> = ({ user }) => {
  return (
    <AppView name={user.name} width="standard">
      <PageTitle title="Settings" />
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

export default AppAccount;
