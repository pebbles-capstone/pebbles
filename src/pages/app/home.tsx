import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";

interface MockUser {
  name: string;
  email: string;
}

interface AuthPage {
  user: MockUser;
}

const AppHome: NextPage<AuthPage> = ({ user }) => {
  return (
    <AppView name={user.name}>
      <div>
        <h1>Home</h1>
        <p>Dashboard that will give users an overview of everything</p>
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

export default AppHome;
