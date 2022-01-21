import { withAuth } from "../../contexts/Auth";

function AppIndex() {
  return <div>Redirecting…</div>;
}

export const getServerSideProps = async (context: any) => {
  const user = await withAuth(context);

  if (!user) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  return {
    redirect: { permanent: false, destination: `/app/home` },
  };
};

export default AppIndex;
