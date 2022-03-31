import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { AppView } from "../../components/app/AppView";
import { PageTitle } from "../../components/app/PageTitle";
import { ContentBox } from "../../components/app/ContentBox";
import { TablePanel } from "../../components/app/TablePanel";
import { withAuth, useAuth } from "../../contexts/Auth";
import { AuthPage, Supervisor } from "../../types";
import api from "../../lib/api";

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

const Supervisors: NextPage<AuthPage> = () => {
  const { user } = useAuth();
  const [loadingSupervisors, setLoadingSupervisors] = useState(true);
  const [potentialSupervisors, setPotentialSupervisors] = useState<
    Supervisor[]
  >([]);
  const [supervisorRows, setSupervisorRows] = useState<string[][]>([]);

  useEffect(() => {
    const getSupervisors = async () => {
      if (user) {
        const recs: any = await api.getRecs(user?.id);
        setPotentialSupervisors(recs.profRec);
      }
    };

    if (user) getSupervisors();
  }, [user]);

  useEffect(() => {
    if (potentialSupervisors.length > 0) {
      const rows = supervisors.map((supervisor) => {
        return [supervisor.name, supervisor.email, supervisor.interests];
      });
      setSupervisorRows(rows);
      setLoadingSupervisors(false);
    }
  }, [potentialSupervisors]);

  return (
    <AppView name={user?.name!} width="wide">
      <PageTitle title="Based on your project likings and everyone elses’, we suggest contacting the following supervisors!" />
      <ContentBox
        title="How we sort"
        description="Supervisors are sorted based on the information you entered when signing up and the past projects you've rated"
      />
      {!loadingSupervisors && (
        <TablePanel
          title="Potential Supervisors"
          columns={["Name", "Email", "Interests"]}
          rows={supervisorRows}
          customGridStyle="SupervisorsTable"
        />
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

export default Supervisors;
