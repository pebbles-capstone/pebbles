import { useState } from "react";
import type { NextPage } from "next";
import { AuthView } from "../components/Auth/AuthView";
import { Formik } from "formik";
import { Button } from "../atoms/Button";
import { TextInput } from "../atoms/TextInput";

const stepNames: { [key: number]: string } = {
  0: "General information",
  1: "ECE information",
  2: "Interests",
};

const SignUp: NextPage = () => {
  // Step state controls which part of signup user sees
  // step 0 => general info
  // step 1 => ECE info
  // step 2 => interests info
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step !== 2) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step !== 0) setStep((prev) => prev - 1);
  };

  return (
    <AuthView>
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-medium mb-2">Create an account</h1>
        <h2 className="text-md font-medium mb-8">
          Step {step + 1} of 3: {stepNames[step]}
        </h2>
      </div>
    </AuthView>
  );
};

export default SignUp;
