import { Formik, Field } from "formik";
import { Button } from "../../atoms/Button";
import { TextInput } from "../../atoms/TextInput";

interface SignUpStep2Props {
  next: () => void;
  prev: () => void;
}

interface InitialValuesProps {
  discipline: string;
  areas: string[];
}

export const SignUpStep2: React.FC<SignUpStep2Props> = ({ next, prev }) => {
  const initialValues: InitialValuesProps = { discipline: "", areas: [] };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.discipline) errors.discipline = "Discipline is required";
        if (values.areas.length === 0) errors.areas = "Areas are required";

        if (values.areas.length < 2)
          errors.area = "More than 1 area is required";

        return errors;
      }}
      onSubmit={(values, { setErrors }) => {
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
        next();
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <fieldset className="flex flex-col mb-4">
            <legend className="inline-block mb-1">Your discipline?</legend>
            <div className="flex">
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.discipline === "Computer"
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 cursor-pointer`}
              >
                <input
                  type="radio"
                  name="discipline"
                  value="Computer"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Computer</span>
              </label>
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.discipline === "Electrical"
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } cursor-pointer`}
              >
                <input
                  type="radio"
                  name="discipline"
                  value="Electrical"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Electrical</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="flex flex-col mb-6">
            <legend className="inline-block mb-1">
              Your ECE areas of study?
            </legend>
            <div className="flex flex-wrap max-w-sm -mt-3">
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.areas.includes("area1")
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 mt-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value="area1"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Area 1</span>
              </label>
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.areas.includes("area2")
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 mt-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value="area2"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Area 2</span>
              </label>
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.areas.includes("area3")
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 mt-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value="area3"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Area 3</span>
              </label>
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.areas.includes("area4")
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 mt-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value="area4"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Area 4</span>
              </label>
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.areas.includes("area5")
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 mt-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value="area5"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Area 5</span>
              </label>
              <label
                className={`font-sans-serif text-sans-serif-md rounded w-fit-content h-fit-content px-4 py-2 ${
                  values.areas.includes("area6")
                    ? "bg-blue text-white"
                    : "bg-grey text-black bg-opacity-30"
                } mr-3 mt-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value="area6"
                  onChange={handleChange}
                  className="w-0 h-0"
                />
                <span>Area 6</span>
              </label>
            </div>
          </fieldset>
          <div className="flex">
            <Button
              size="sm"
              text="Back"
              ariaLabel="Prev step"
              isLink={false}
              isInternal={false}
              style="border-secondary"
              onClick={prev}
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
              disabled={values.areas.length === 0 || values.discipline === ""}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};
