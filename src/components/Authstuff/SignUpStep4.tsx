import { useFormik } from "formik";
import { Button } from "../../atoms/Button";
import { TextInput } from "../../atoms/TextInput";
import { useAuth } from "../../contexts/Auth";
import { useRouter } from "next/router";

interface SignUpStep4Props {
  email: string;
  password: string;
}

interface InitialValuesProps {
  code: string;
}

export const SignUpStep4: React.FC<SignUpStep4Props> = (props) => {
  const { email, password } = props;

  const { confirmSignUpUser } = useAuth();
  const router = useRouter();

  const initialValues: InitialValuesProps = {
    code: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.code) errors.code = "Code is required";

      return errors;
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        const user = await confirmSignUpUser(email, password, values.code);
        if (user) router.push("/app/home");
      } catch (err: any) {
        console.log(err);
        setStatus(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <TextInput
        type="text"
        name="code"
        onChange={formik.handleChange}
        value={formik.values.code}
        placeholder="Enter the code sent to your email"
        label="Confirmation code"
        id="signUpCode"
        wrapperClassName="mb-4"
        error={formik.errors.code}
      />
      {!!formik.status && <p className="text-red mb-6">{formik.status}</p>}
      <div className="flex">
        <Button
          size="sm"
          text="Confirm Signup"
          ariaLabel="Confirm Signup"
          isLink={false}
          isInternal={false}
          style="border-primary"
          type="submit"
          disabled={!formik.values.code}
        />
      </div>
    </form>
  );
};
