import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { TablePanel } from "../../components/app/TablePanel";
import { PageTitle } from "../../components/app/PageTitle";
import { withAuth, useAuth } from "../../contexts/Auth";
import { AuthPage, OtherUser } from "../../types";

const potentialTeammates: OtherUser[] = [
  {
    name: "Udit Desai",
    email: "udit@mail.utoronto.ca",
  },
  {
    name: "Nish Patel",
    email: "nish@mail.utoronto.ca",
  },
  {
    name: "Krishna Solanki",
    email: "krishna@mail.utoronto.ca",
  },
  {
    name: "Sam Weninger",
    email: "sam@mail.utoronto.ca",
  },
  {
    name: "Charlotte Moryto",
    email: "charlotte@mail.utoronto.ca",
  },
  {
    name: "Wasif Zulkernine",
    email: "wasif@mail.utoronto.ca",
  },
  {
    name: "Gurmehar Sandhu",
    email: "gurm@mail.utoronto.ca",
  },
  {
    name: "Rhea Dhar",
    email: "rhea@mail.utoronto.ca",
  },
];

const PotentialTeammates: NextPage<AuthPage> = () => {
  const { user } = useAuth();

  const rows = potentialTeammates.map((person) => {
    return [person.name, person.email];
  });

  return (
    <AppView name={user?.name!} width="wide">
      <PageTitle title="Based on your project likings and everyone elses’, we suggest teaming with any of the following students!" />
      <ContentBox
        title="How we sort"
        description="Teammates are sorted based on the information users entered when signing up and past projects everyone has rated"
      />
      <TablePanel
        title="Potential Teammates"
        columns={["Name", "Email"]}
        rows={rows}
        customGridStyle="PotentialTeammatesTable"
      />
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
