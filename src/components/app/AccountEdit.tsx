import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../atoms/Button";
import { Discipline } from "../../pages/signup";
import { TextInput } from "../../atoms/TextInput";
import { RadioGroup } from "../../atoms/RadioGroup";
import { CheckBoxGroup } from "../../atoms/CheckBoxGroup";

interface AccountEditProps {}

interface InitialValuesProps {
  email: string;
  name: string;
  discipline: Discipline | "";
  areas: string[];
  interests: string[];
}

export const AccountEdit: React.FC<AccountEditProps> = (props) => {
  const initialValues: InitialValuesProps = {
    email: "udit.desai3@gmail.com",
    name: "Udit Desai",
    discipline: "Computer",
    areas: ["area5", "area6"],
    interests: ["i1", "i2", "i3"],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.email) errors.email = "Email is required";
      if (!values.name) errors.name = "Name is required";
      if (!values.discipline) errors.discipline = "Discipline is required";
      if (values.areas.length === 0) errors.areas = "Areas are required";
      if (values.interests.length === 0)
        errors.interests = "Interests are required";

      if (values.areas.length < 2) errors.area = "More than 1 area is required";

      return errors;
    },
    onSubmit: (values, { setErrors }) => {
      const newErrors: { [key: string]: string } = {};
      let isError = false;

      if (values.discipline !== "Computer") {
        isError = true;
        newErrors.general = "There was an error in the server";
      }

      if (isError) {
        setErrors(newErrors);
        return;
      }

      console.log(values);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const submitNewInformation = () => {
    // logic for submitting new info

    formik.handleSubmit();
    setIsEditing(false);
  };

  const discardNewInformation = () => {
    // logic for clearing all fields

    formik.resetForm();
    setIsEditing(false);
  };

  return (
    <div className="w-full p-6 flex flex-col bg-white rounded-md shadow-md relative">
      <h2 className="text-md font-medium mb-4 max-w-3xl">General</h2>
      {isEditing ? (
        <form className="mt-3">
          <TextInput
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your email"
            label="Email address"
            id="signUpEmail"
            wrapperClassName="mb-4"
            error={formik.errors.email}
          />
          <TextInput
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Enter your full name"
            label="Full name"
            id="signUpName"
            wrapperClassName="mb-4"
            error={formik.errors.email}
          />
          <RadioGroup
            legend="Your discipline?"
            currentValue={formik.values.discipline}
            values={["Computer", "Electrical"]}
            labels={["Computer", "Electrical"]}
            onChange={formik.handleChange}
            name="discipline"
            className="mb-6"
          />
          <CheckBoxGroup
            legend="Your ECE areas of study?"
            currentValues={formik.values.areas}
            values={["area1", "area2", "area3", "area4", "area5", "area6"]}
            labels={[
              "Area 1",
              "Area 2",
              "Area 3",
              "Information Systems",
              "Hardware",
              "Software",
            ]}
            onChange={formik.handleChange}
            name="areas"
            className="mb-6"
          />
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
          />
          <div className="absolute top-0 right-0 p-6 flex">
            <Button
              isLink={false}
              isInternal={false}
              onClick={discardNewInformation}
              text="Discard edits"
              ariaLabel="Discard edits"
              size="md"
              style="border-red"
              className="mr-2"
            />
            <Button
              isLink={false}
              isInternal={false}
              onClick={submitNewInformation}
              text="Save edits"
              ariaLabel="Save edits"
              size="md"
              style="border-primary"
            />
          </div>
        </form>
      ) : (
        <div className="mt-3 flex flex-col">
          <h3 className="text-base font-medium mb-1">Email</h3>
          <p className="mb-4">udit.desai3@gmail.com</p>
          <h3 className="text-base font-medium mb-1">Full name</h3>
          <p className="mb-6">Udit Desai</p>
          <h3 className="text-base font-medium mb-1">Password</h3>
          <Button
            isLink={false}
            isInternal={false}
            onClick={() => {}}
            text="Reset password"
            ariaLabel="Reset password"
            size="md"
            style="blank"
          />
          <h3 className="text-base font-medium mt-6 mb-1">Discipline</h3>
          <p className="mb-4">Computer</p>
          <h3 className="text-base font-medium mb-1">Focus Areas</h3>
          <div className="grid grid-cols-2 w-full md:w-1/2 mb-4">
            <p>Hardware</p>
            <p>Software</p>
          </div>
          <h3 className="text-base font-medium mb-1">Interests</h3>
          <div className="grid grid-cols-2 w-full md:w-1/2 gap-y-1">
            <p>Interest 1</p>
            <p>Interest 2</p>
            <p>Interest 3</p>
            <p>Interest 4</p>
            <p>Interest 5</p>
          </div>
          <div className="absolute top-0 right-0 p-6 flex">
            <Button
              isLink={false}
              isInternal={false}
              onClick={startEditing}
              text="Edit"
              ariaLabel="Edit"
              size="md"
              style="border-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
};
