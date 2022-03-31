import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { TablePanel } from "../../components/app/TablePanel";
import { PageTitle } from "../../components/app/PageTitle";
import { withAuth, useAuth } from "../../contexts/Auth";
import { AuthPage, OtherUser } from "../../types";
import api from "../../lib/api";

const PotentialTeammates: NextPage<AuthPage> = () => {
  const { user } = useAuth();
  const [loadingTeammates, setLoadingTeammates] = useState(true);
  const [potentialTeammates, setPotentialTeammates] = useState<OtherUser[]>([]);
  const [teammateRows, setTeammateRows] = useState<string[][]>([]);

  useEffect(() => {
    const getTeammates = async () => {
      if (user) {
        const recs: any = await api.getRecs(user?.id);
        setPotentialTeammates(recs.userRec);
      }
    };

    if (user) getTeammates();
  }, [user]);

  useEffect(() => {
    if (potentialTeammates.length > 0) {
      const rows = potentialTeammates.map((person) => {
        return [person.name, person.email];
      });
      setTeammateRows(rows);
      setLoadingTeammates(false);
    }
  }, [potentialTeammates]);

  return (
    <AppView name={user?.name!} width="wide">
      <PageTitle title="Based on your project likings and everyone elses’, we suggest teaming with any of the following students!" />
      <ContentBox
        title="How we sort"
        description="Teammates are sorted based on the information users entered when signing up and past projects everyone has rated"
      />
      {!loadingTeammates && (
        <TablePanel
          title="Potential Teammates"
          columns={["Name", "Email"]}
          rows={teammateRows}
          customGridStyle="PotentialTeammatesTable"
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

export default PotentialTeammates;
