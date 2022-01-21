import { useFormik } from "formik";
import { Button } from "../../atoms/Button";
import { CheckBoxGroup } from "../../atoms/CheckBoxGroup";
import { Discipline, Area } from "../../types";
import { useAuth } from "../../contexts/Auth";
import { useRouter } from "next/router";

interface SignUpStep3Props {
  next: () => void;
  prev: () => void;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  discipline: Discipline;
  areas: Area[];
  interests: string[];
  setSavedInterests: (arg0: string[]) => void;
}

interface InitialValuesProps {
  interests: string[];
}

export const SignUpStep3: React.FC<SignUpStep3Props> = (props) => {
  const {
    next,
    prev,
    email,
    password,
    name,
    confirmPassword,
    discipline,
    areas,
    interests,
    setSavedInterests,
  } = props;

  const { signUpUser } = useAuth();
  const router = useRouter();

  const goBack = () => {
    setSavedInterests(formik.values.interests);
    prev();
  };

  const initialValues: InitialValuesProps = {
    interests: interests,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (values.interests.length === 0)
        errors.interests = "Interests are required";

      return errors;
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        const data = {
          discipline: discipline,
          areas: areas,
          interests: interests,
        };
        const user = await signUpUser(email, password, name, data);
        if (user) next();
      } catch (err: any) {
        console.log(err);
        setStatus(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <CheckBoxGroup
        legend="Your interests?"
        currentValues={formik.values.interests}
        values={["i1", "i2", "i3", "i4", "i5", "i6"]}
        labels={[
          "Interest 1",
          "Machine Learning",
          "Interest 3",
          "Physics",
          "Web development",
          "Integrated Circuits",
        ]}
        onChange={formik.handleChange}
        name="interests"
        className="mb-8"
        error={formik.errors.interests as string}
      />
      {!!formik.status && <p className="text-red mb-6">{formik.status}</p>}
      <div className="flex">
        <Button
          size="sm"
          text="Back"
          ariaLabel="Prev step"
          isLink={false}
          isInternal={false}
          style="border-secondary"
          onClick={goBack}
          className="mr-4"
        />
        <Button
          size="sm"
          text="Signup"
          ariaLabel="Signup"
          isLink={false}
          isInternal={false}
          style="border-primary"
          type="submit"
          disabled={formik.values.interests.length === 0}
        />
      </div>
    </form>
  );
};
