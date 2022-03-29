import React, { createContext, useEffect, useState, useContext } from "react";
import Amplify, { Auth, withSSRContext } from "aws-amplify";
import awsExports from "../../aws-exports";
import { GetServerSidePropsContext } from "next";
import { UserData, User } from "../types";
import { CognitoUser } from "amazon-cognito-identity-js";
import api from "../lib/api";
Amplify.configure({ ...awsExports, ssr: true });

// Assign types to anything added to the context provider value prop.
// This enables type checking in context consumers.
type AuthContext = {
  checkIfUserLoggedIn: () => Promise<CognitoUser | null>;
  signUpUser: (
    email: string,
    password: string,
    fullName: string,
    data: UserData
  ) => Promise<boolean>;
  confirmSignUpUser: (
    email: string,
    password: string,
    code: string
  ) => Promise<CognitoUser | null>;
  resetPassword: (email: string) => Promise<boolean>;
  confirmResetPassword: (
    email: string,
    password: string,
    code: string
  ) => Promise<boolean>;
  signInUser: (email: string, password: string) => Promise<CognitoUser | null>;
  signOutUser: () => Promise<boolean>;
  loadingUser: boolean;
  user: CognitoUser | null;
};

const AuthContext = createContext<AuthContext | null>(null);

const defaultUserValue = null;

/**
 * Use in getServerSideProps() to access Auth context,
 * user data. Returns user data.
 */
export const withAuth = async (
  context: GetServerSidePropsContext
): Promise<User | null> => {
  const SSR = withSSRContext(context);
  try {
    const user = await SSR.Auth.currentAuthenticatedUser();
    const details = await SSR.Auth.currentUserInfo();
    if (user && details) {
      return {
        id: details.id,
        email: details.attributes.email,
        name: details.attributes.email,
        data: {
          discipline: "Computer",
          areas: [],
          interests: [],
        },
      };
    } else return defaultUserValue;
  } catch (err) {
    console.log("user not logged in", err);
    return defaultUserValue;
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(
    defaultUserValue
  );
  const [userData, setUserData] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const checkIfUserLoggedIn: AuthContext["checkIfUserLoggedIn"] = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        return user;
        setCurrentUser(user);
      } else return defaultUserValue;
    } catch (err) {
      console.log(err);
    }
  };

  const signUpUser: AuthContext["signUpUser"] = async (
    email,
    password,
    name,
    data
  ) => {
    // await Users.create({ email, password, handle, data });
    // const user = await signInUser(email, password);
    // return user;
    const user = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        name: name,
      },
    });
    if (user) {
      // store user data in local storage
      setUserData({
        name: name,
        email: email,
        data: data,
      });
      return true;
    } else {
      return false;
    }
  };

  const confirmSignUpUser: AuthContext["confirmSignUpUser"] = async (
    email,
    password,
    code
  ) => {
    setLoadingUser(true);
    const result = await Auth.confirmSignUp(email, code);
    if (result && result === "SUCCESS") {
      const user = await signInUser(email, password);
      return user;
    } else {
      return defaultUserValue;
    }
  };

  const resetPassword: AuthContext["resetPassword"] = async (email) => {
    const result = await Auth.forgotPassword(email);
    if (result) {
      console.log(result);
      return true;
    } else {
      return false;
    }
  };

  const confirmResetPassword: AuthContext["confirmResetPassword"] = async (
    email,
    password,
    code
  ) => {
    const result = await Auth.forgotPasswordSubmit(email, code, password);
    if (result) {
      console.log(result);
      return true;
    } else {
      return false;
    }
  };

  const signInUser: AuthContext["signInUser"] = async (email, password) => {
    setLoadingUser(true);
    const user = await Auth.signIn(email, password);
    if (user) {
      console.log(user);
      console.log(userData);

      const backendUser: any = await api.getUser(user.attributes.sub);

      console.log("signed in with cognito username and password");
      console.log("tried calling api.getuser", backendUser);

      if (backendUser.data.statusCode === 200) {
        console.log("signed in with api.getuser");
        setCurrentUser(backendUser);
        setLoadingUser(false);
        return backendUser;
      } else {
        console.log(
          "api.getuser did not return anything proper, so gonna try post"
        );
        const postUserData: User = {
          id: user.attributes.sub,
          email: userData.email,
          name: userData.name,
          data: {
            discipline: userData.data.discipline,
            areas: userData.data.areas,
            interests: userData.data.interests,
            interestVector: [0, 0, 0, 0, 0, 0],
          },
        };
        const newBackendUser = await api.postUser(
          user.attributes.sub,
          postUserData
        );

        console.log("did api.postuser and got this back", newBackendUser);

        setCurrentUser(newBackendUser);
        setLoadingUser(false);
        return newBackendUser;
      }
    } else {
      return defaultUserValue;
    }
  };

  const signOutUser: AuthContext["signOutUser"] = async () => {
    try {
      await Auth.signOut();
      return true;
    } catch (error) {
      console.log("error signing out: ", error);
      return false;
    }
  };

  // Attempt to load user at runtime.
  useEffect(() => {
    const loadUser = async () => {
      const user = await checkIfUserLoggedIn();
      setLoadingUser(false);
      if (user) setCurrentUser(user);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loadingUser,
        checkIfUserLoggedIn,
        signInUser,
        signUpUser,
        resetPassword,
        confirmResetPassword,
        confirmSignUpUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * A React hook to expose context values to components.
 */
export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === null)
    throw "useAuth must be used within the context of the AuthContext.Provider";
  return auth;
};
