import Link from "next/link";
import type { NextPage } from "next";
import { AuthView } from "../components/Auth/AuthView";
import { Formik } from "formik";
import { Button } from "../atoms/Button";
import { TextInput } from "../atoms/TextInput";

const SignIn: NextPage = () => {
  return (
    <AuthView>
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-medium mb-8">Sign in</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnChange={false}
          validate={(values) => {
            const errors: { [key: string]: string } = {};

            if (!values.email) errors.email = "Email is required";
            if (!values.password) errors.password = "Password is required";

            return errors;
          }}
          onSubmit={(values, { setErrors }) => {
            const newErrors: { [key: string]: string } = {};
            let isError = false;

            if (values.password !== "password") {
              isError = true;
              newErrors.password = "Password is incorrect";
            }

            if (isError) {
              setErrors(newErrors);
              return;
            }

            console.log(values);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <TextInput
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Enter your email"
                label="Email address"
                id="signInEmail"
                wrapperClassName="mb-4"
                error={errors.email}
              />
              <TextInput
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Enter your password"
                label="Password"
                id="signInPassword"
                wrapperClassName="mb-6"
                error={errors.password}
              />
              <Button
                size="sm"
                text="Sign in"
                ariaLabel="Sign in"
                isLink={false}
                isInternal={false}
                type="border-primary"
                disabled={values.email === "" || values.password === ""}
              />
            </form>
          )}
        </Formik>
        <p className="mt-8">
          Don't have an account?{" "}
          <Link href="/signup">
            <a className="text-blue-dark">Sign up!</a>
          </Link>
        </p>
        <p className="mt-1">
          Forgot your password?{" "}
          <Link href="/signup">
            <a className="text-blue-dark">Reset password.</a>
          </Link>
        </p>
      </div>
    </AuthView>
  );
};

export default SignIn;
