import { useState } from "react";
import { Formik } from "formik";
import { Button } from "../../atoms/Button";
import { TextInput } from "../../atoms/TextInput";
import { useAuth } from "../../contexts/Auth";
import { useRouter } from "next/router";

interface ResetPasswordStep2Props {
  email: string;
}

export const ResetPasswordStep2: React.FC<ResetPasswordStep2Props> = (
  props
) => {
  const { email } = props;

  const { confirmResetPassword } = useAuth();

  const [isError, setIsError] = useState(false);

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
        code: "",
        password: "",
        confirmPassword: "",
      }}
      validateOnChange={false}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.code) errors.name = "Code is required";
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
      onSubmit={async (values, { setStatus }) => {
        try {
          const result = await confirmResetPassword(
            email,
            values.password,
            values.code
          );
          if (result) {
            setIsError(false);
            setStatus("Your password has been changed!");
          }
        } catch (err: any) {
          console.log(err);
          setIsError(true);
          setStatus(err.message);
        }
      }}
    >
      {({ values, errors, status, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextInput
            type="text"
            name="code"
            onChange={handleChange}
            value={values.code}
            placeholder="Enter the code sent to your email"
            label="Code"
            id="resetPasswordCode"
            wrapperClassName="mb-4"
            error={errors.code}
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
          {!!status && (
            <p className={`${isError ? "text-red" : "text-black"} mb-6`}>
              {status}
            </p>
          )}
          <Button
            size="sm"
            text="Reset Password"
            ariaLabel="Next step"
            isLink={false}
            isInternal={false}
            style="border-primary"
            type="submit"
            disabled={
              values.code === "" ||
              values.password === "" ||
              values.confirmPassword === ""
            }
          />
        </form>
      )}
    </Formik>
  );
};
