import { Formik } from "formik";
import { Button } from "../../atoms/Button";
import { TextInput } from "../../atoms/TextInput";
import { useAuth } from "../../contexts/Auth";

interface ResetPasswordStep1Props {
  next: () => void;
  email: string;
  setSavedEmail: (arg0: string) => void;
}

export const ResetPasswordStep1: React.FC<ResetPasswordStep1Props> = (
  props
) => {
  const { next, email, setSavedEmail } = props;

  const { resetPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        email: email,
      }}
      validateOnChange={false}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.email) errors.email = "Email is required";

        return errors;
      }}
      onSubmit={async (values, { setStatus }) => {
        try {
          setSavedEmail(values.email);
          const result = await resetPassword(values.email);
          if (result) next();
        } catch (err: any) {
          console.log(err);
          setStatus(err.message);
        }
      }}
    >
      {({ values, errors, status, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextInput
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Enter your email"
            label="Email address"
            id="resetPasswordEmail"
            wrapperClassName="mb-4"
            error={errors.email || status}
          />
          <Button
            size="sm"
            text="Next"
            ariaLabel="Next step"
            isLink={false}
            isInternal={false}
            style="border-primary"
            type="submit"
            disabled={values.email === ""}
          />
        </form>
      )}
    </Formik>
  );
};
