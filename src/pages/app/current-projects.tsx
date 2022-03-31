import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { AppView } from "../../components/app/AppView";
import { ContentBox } from "../../components/app/ContentBox";
import { PageTitle } from "../../components/app/PageTitle";
import { TablePanel } from "../../components/app/TablePanel";
import { PastProject, CurrentProject } from "../../types";
import { withAuth, useAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";
import api from "../../lib/api";

const CurrentProjects: NextPage<AuthPage> = () => {
  const { user } = useAuth();
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [currentProjects, setCurrentProjects] = useState<PastProject[]>([]);
  const [projRows, setProjRows] = useState<string[][]>([]);

  useEffect(() => {
    const getProjects = async () => {
      if (user) {
        const recs: any = await api.getRecs(user?.id);
        setCurrentProjects(recs.projectRec);
      }
    };

    if (user) getProjects();
  }, [user]);

  useEffect(() => {
    if (currentProjects.length > 0) {
      const rows = currentProjects.map((project) => {
        return [project.title, project.supervisor, project.description];
      });
      setProjRows(rows);
      setLoadingProjects(false);
    }
  }, [currentProjects]);

  return (
    <AppView name={user?.name!} width="wide">
      <PageTitle title="View all the current posted projects by supervisors already sorted based on what we think you'll like!" />
      <ContentBox
        title="How we sort"
        description="The current projects are sorted based on the information you entered when signing up and how you rated past projects."
      />
      {!loadingProjects && (
        <TablePanel
          title="Current Projects"
          columns={["Title", "Supervisor", "Description"]}
          rows={projRows}
          customGridStyle="ProjectsTable"
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

export default CurrentProjects;
