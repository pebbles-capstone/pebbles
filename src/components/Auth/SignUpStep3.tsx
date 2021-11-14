import { useFormik } from "formik";
import { Button } from "../../atoms/Button";
import { CheckBoxGroup } from "../../atoms/CheckBoxGroup";
import { Discipline } from "../../pages/signup";

interface SignUpStep3Props {
  next: () => void;
  prev: () => void;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  discipline: Discipline | "";
  areas: string[];
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
        errors.areas = "Interests are required";

      if (values.interests.length < 3)
        errors.area = "More than 3 interests are required";

      return errors;
    },
    onSubmit: (values, { setErrors }) => {
      const newErrors: { [key: string]: string } = {};
      let isError = false;

      if (values.interests.includes("i4")) {
        isError = true;
        newErrors.general = "There was an error in the server";
      }

      if (isError) {
        setErrors(newErrors);
        return;
      }

      setSavedInterests(values.interests);

      console.log(values);
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
      />
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
          text="Next"
          ariaLabel="Next step"
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
