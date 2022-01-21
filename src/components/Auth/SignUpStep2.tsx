import { useFormik } from "formik";
import { Button } from "../../atoms/Button";
import { RadioGroup } from "../../atoms/RadioGroup";
import { CheckBoxGroup } from "../../atoms/CheckBoxGroup";
import { Discipline, Area } from "../../types";

interface SignUpStep2Props {
  next: () => void;
  prev: () => void;
  discipline: Discipline;
  areas: Area[];
  setSavedDiscipline: (arg0: Discipline) => void;
  setSavedAreas: (arg0: Area[]) => void;
}

interface InitialValuesProps {
  discipline: Discipline;
  areas: Area[];
}

export const SignUpStep2: React.FC<SignUpStep2Props> = (props) => {
  const { next, prev, discipline, areas, setSavedDiscipline, setSavedAreas } =
    props;

  const initialValues: InitialValuesProps = {
    discipline: discipline,
    areas: areas,
  };

  const goBack = () => {
    setSavedDiscipline(formik.values.discipline);
    setSavedAreas(formik.values.areas);
    prev();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.discipline) errors.discipline = "Discipline is required";
      if (values.areas.length === 0) errors.areas = "Areas are required";

      if (values.areas.length < 2) errors.area = "More than 1 area is required";

      return errors;
    },
    onSubmit: (values) => {
      setSavedDiscipline(values.discipline);
      setSavedAreas(values.areas);
      next();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <RadioGroup
        legend="Your discipline?"
        currentValue={formik.values.discipline}
        values={["Computer", "Electrical"]}
        labels={["Computer", "Electrical"]}
        onChange={formik.handleChange}
        name="discipline"
        className="mb-4"
      />
      <CheckBoxGroup
        legend="Your ECE areas of study?"
        currentValues={formik.values.areas}
        values={[
          "Photonics and Semiconductor Physics",
          "Electromagnetics and Energy Systems",
          "Analog and Digital Electronics",
          "Control, Communications and Signal Processing",
          "Computer Hardware & Computer Networks",
          "Software",
        ]}
        labels={[
          "Photonics and Semiconductor Physics",
          "Electromagnetics and Energy Systems",
          "Analog and Digital Electronics",
          "Control, Communications and Signal Processing",
          "Computer Hardware & Computer Networks",
          "Software",
        ]}
        onChange={formik.handleChange}
        name="areas"
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
          disabled={formik.values.areas.length === 0}
        />
      </div>
    </form>
  );
};
