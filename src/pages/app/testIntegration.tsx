import type { NextPage } from "next";
import Amplify, { Auth } from "aws-amplify";
import { withAuth } from "../../contexts/Auth";
import { AuthPage } from "../../types";
import api from "../../lib/api";
import { useState } from "react";
import { User } from "../../types";
import PastProjects from "./past-projects";

const TestIntegration: NextPage<AuthPage> = ({ user }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const getProj = async () => {
    const proj = await api.getProjects();
    console.log(proj);
    setData(proj as never[]);
    return proj;
  };

  const getRecs = async () => {
    const recs = await api.getRecs(99);
    // console.log(recs.profRec);
    setData1([recs] as never[]);
    return recs;
  };

  const postUser = async () => {
    const user: User = {
      id: "900",
      email: "haha@demo.com",
      name: "haha",
      data: {
        discipline: "Computer",
        areas: ["Analog and Digital Electronics", "Software"],
        interestVector: [1, 290],
        interests: [""],
      },
    };
    const res = await api.postUser("900", user);
    console.log(res);
  };

  const getUser = async () => {
    const res = await api.getUser(299299);
    console.log([res]);
    const array_res = [res];
    setData2(array_res as never[]);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ textAlign: "center", padding: "10px" }}>
        Hi My name is: {user?.name}!
      </div>
      <input
        onClick={getProj}
        style={{
          width: "150px",
          height: "40px",
          marginTop: "20px",
          borderRadius: "25px",
        }}
        type="button"
        value="Get Projects"
      />
      {data.map((e, id, _) => {
        return (
          <div style={{ padding: 10, textAlign: "center" }} key={id}>
            {JSON.stringify(e)}
          </div>
        );
      })}
      <input
        onClick={getRecs}
        style={{
          width: "150px",
          height: "40px",
          marginTop: "20px",
          borderRadius: "25px",
        }}
        type="button"
        value="Get Recs"
      />
      {data1.map((e, id, _) => {
        return (
          <div style={{ padding: 10, textAlign: "center" }} key={id}>
            {JSON.stringify(e)}
          </div>
        );
      })}
      <input
        onClick={getUser}
        style={{
          width: "150px",
          height: "40px",
          marginTop: "20px",
          borderRadius: "25px",
        }}
        type="button"
        value="Get User"
      />
      {data2.map((e, id, _) => {
        return (
          <div style={{ padding: 10, textAlign: "center" }} key={id}>
            {JSON.stringify(e)}
          </div>
        );
      })}
      <input
        onClick={postUser}
        style={{
          width: "150px",
          height: "40px",
          marginTop: "20px",
          borderRadius: "25px",
        }}
        type="button"
        value="post User"
      />
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
