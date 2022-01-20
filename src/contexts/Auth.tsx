import React, { createContext, useEffect, useState, useContext } from "react";
import Amplify, { Auth, withSSRContext } from "aws-amplify";
import awsExports from "../../aws-exports";
import { GetServerSidePropsContext } from "next";
import { UserData, User } from "../types";

Amplify.configure({ ...awsExports, ssr: true });

// Assign types to anything added to the context provider value prop.
// This enables type checking in context consumers.
type AuthContext = {
  checkIfUserLoggedIn: () => Promise<User | null>;
  signUpUser: (
    email: string,
    password: string,
    data: UserData
  ) => Promise<boolean>;
  confirmSignUpUser: (
    email: string,
    password: string,
    code: string
  ) => Promise<User | null>;
  signInUser: (email: string, password: string) => Promise<User | null>;
  signOutUser: () => Promise<boolean>;
  loadingUser: boolean;
  user: User | null;
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
    if (user) return user;
    else return defaultUserValue;
  } catch (err) {
    return defaultUserValue;
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUserValue);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const checkIfUserLoggedIn: AuthContext["checkIfUserLoggedIn"] = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        return user;
        setUser(user);
      } else return defaultUserValue;
    } catch (err) {
      console.log("user not logged in", err);
    }
  };

  const signUpUser: AuthContext["signUpUser"] = async (
    email,
    password,
    data
  ) => {
    // await Users.create({ email, password, handle, data });
    // const user = await signInUser(email, password);
    // return user;
    try {
      const user = await Auth.signUp({
        username: email,
        password: password,
      });
      if (user) {
        // store user data in local storage
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error signing up:", error);
      return false;
    }
  };

  const confirmSignUpUser: AuthContext["confirmSignUpUser"] = async (
    email,
    password,
    code
  ) => {
    setLoadingUser(true);
    try {
      const result = await Auth.confirmSignUp(email, code);
      if (result && result === "SUCCESS") {
        const user = await signInUser(email, password);
        return user;
      } else {
        return defaultUserValue;
      }
    } catch (error) {
      console.log("error confirming sign up", error);
      return defaultUserValue;
    }
  };

  const signInUser: AuthContext["signInUser"] = async (email, password) => {
    setLoadingUser(true);
    const user = await Auth.signIn(email, password);
    if (user) {
      setUser(user);
      setLoadingUser(false);
      return user;
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
      if (user) setUser(user);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        checkIfUserLoggedIn,
        signInUser,
        signUpUser,
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
