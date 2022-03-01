import type { NextPage } from "next";
import Amplify, { Auth } from "aws-amplify";
import { withAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";
import api from "../../lib/api";
import { useState } from "react";

const TestIntegration: NextPage<AuthPage> = ({ user }) => {
    const [data, setData] = useState([]);
    const getProj = async() => {
        const proj = await api.getProjects();
        console.log(proj);
        setData(proj);
        return proj;
    }

  return (
    <div style={{textAlign: "center"}}>
        <div style={{textAlign: "center", padding: "10px"}}>
            Hi My name is: {user?.name}!
        </div>
        <input 
            onClick={getProj}
            style={{width: "150px", height: "40px", marginTop: "20px", borderRadius: "25px"}}
            type="button"
            value="Get Projects"
        />
        {
            data.map((e,id,_) => {
                return (
                <div style={{padding: 10, textAlign: "center"}} key={id}>
                    {JSON.stringify(e)}
                </div>
                );
            })
        }
    </div>
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

export default TestIntegration;