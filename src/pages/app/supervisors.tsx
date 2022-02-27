import type { NextPage } from "next";
import { AppView } from "../../components/app/AppView";
import { PageTitle } from "../../components/app/PageTitle";
import { ContentBox } from "../../components/app/ContentBox";
import { TablePanel } from "../../components/app/TablePanel";
import { withAuth } from "../../contexts/Auth";
import { AuthPage, Supervisor } from "../../types";

const supervisors: Supervisor[] = [
  {
    name: "Micah Stickel",
    email: "m.stickel@utoronto.ca",
    interests:
      "Electromagnetics, antennas, microwave circuits, device design for wireless systems, radio-frequency identification (RFID), energy harvesting",
  },
  {
    name: "Piero Triverio",
    email: "triverio@waves.utoronto.ca",
    interests:
      "Signal Integrity, Electromagnetic Compatibility, System Identification, Model Order Reduction",
  },
  {
    name: "Mireille Broucke",
    email: "broucke@scg.utoronto.ca",
    interests:
      "Control theory: hybrid systems, multivehicle systems, nonlinear control.",
  },
  {
    name: "Michael Stumm",
    email: "stumm@eecg.toronto.edu",
    interests: "Operating systems, distributed and parallel computer systems.",
  },
  {
    name: "Arno Jacobsen",
    email: "jacobsen@eecg.toronto.edu",
    interests:
      "Distributed system development, application outsourcing and software leasing, various information management aspects, human computer interaction.",
  },
  {
    name: "Peter Herman",
    email: "p.herman@utoronto.ca",
    interests:
      "Our research group studies and develops novel laser processing technology for defining photonic devices, optical circuits, microfluidic and other nanostructures. The laser enables fabrication in novel two- and three-dimensional architectures to be explored in optical materials for broad impact in today's optical communication networks and lab-on-a-chip microsystems.",
  },
];

const Supervisors: NextPage<AuthPage> = ({ user }) => {
  const rows = supervisors.map((supervisor) => {
    return [supervisor.name, supervisor.email, supervisor.interests];
  });

  return (
    <AppView name={user.name} width="wide">
      <PageTitle title="Based on your project likings and everyone elses’, we suggest contacting the following supervisors!" />
      <ContentBox
        title="How we sort"
        description="Supervisors are sorted based on the information you entered when signing up and the past projects you've rated"
      />
      <TablePanel
        title="Potential Supervisors"
        columns={["Name", "Email", "Interests"]}
        rows={rows}
        customGridStyle="SupervisorsTable"
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

export default Supervisors;
