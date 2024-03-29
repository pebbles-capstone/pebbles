import { useState } from "react";
import { Formik } from "formik";
import { Button } from "../../atoms/Button";
import { TextInput } from "../../atoms/TextInput";

interface SignUpStep1Props {
  next: () => void;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  setSavedEmail: (arg0: string) => void;
  setSavedName: (arg0: string) => void;
  setSavedPassword: (arg0: string) => void;
  setSavedConfirmPassword: (arg0: string) => void;
}

export const SignUpStep1: React.FC<SignUpStep1Props> = (props) => {
  const {
    next,
    email,
    name,
    password,
    confirmPassword,
    setSavedEmail,
    setSavedName,
    setSavedPassword,
    setSavedConfirmPassword,
  } = props;

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const toggleViewPassword = () => {
    setViewPassword((prev) => !prev);
  };

  const toggleViewConfirmPassword = () => {
    setViewConfirmPassword((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      }}
      validateOnChange={false}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.email) errors.email = "Email is required";
        if (!values.name) errors.name = "Name is required";
        if (!values.password) errors.password = "Password is required";
        if (!values.confirmPassword)
          errors.confirmPassword = "Reentering password is required";

        if (values.password.length < 8)
          errors.password = "Password must be atleast 8 characters";

        if (values.password !== values.confirmPassword)
          errors.confirmPassword =
            "Entered password does not match password above";

        return errors;
      }}
      onSubmit={(values) => {
        setSavedEmail(values.email);
        setSavedName(values.name);
        setSavedPassword(values.password);
        setSavedConfirmPassword(values.confirmPassword);
        next();
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
            id="signUpEmail"
            wrapperClassName="mb-4"
            error={errors.email}
          />
          <TextInput
            type="text"
            name="name"
            onChange={handleChange}
            value={values.name}
            placeholder="Enter your full name"
            label="Full name"
            id="signUpName"
            wrapperClassName="mb-4"
            error={errors.email}
          />
          <TextInput
            type={viewPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Enter your password"
            label="Password"
            id="signUpPassword"
            wrapperClassName="mb-4"
            error={errors.password}
            rightIcon={true}
            iconAction={toggleViewPassword}
          />
          <TextInput
            type={viewConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            placeholder="Reenter your password"
            label="Confirm Password"
            id="signUpConfirmPassword"
            wrapperClassName="mb-6"
            error={errors.confirmPassword}
            rightIcon={true}
            iconAction={toggleViewConfirmPassword}
          />
          <Button
            size="sm"
            text="Next"
            ariaLabel="Next step"
            isLink={false}
            isInternal={false}
            style="border-primary"
            type="submit"
            disabled={
              values.email === "" ||
              values.password === "" ||
              values.confirmPassword === "" ||
              values.name === ""
            }
          />
        </form>
      )}
    </Formik>
  );
};
