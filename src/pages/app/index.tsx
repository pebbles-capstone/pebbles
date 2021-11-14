function AppIndex() {
  return <div>Redirecting…</div>;
}

export const getServerSideProps = async (context) => {
  const loggedIn = true;

  if (!loggedIn) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  return {
    redirect: { permanent: true, destination: `/app/home` },
  };
};

export default AppIndex;
