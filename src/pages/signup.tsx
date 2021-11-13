import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AuthView } from "../components/Auth/AuthView";
import { SignUpStep1 } from "../components/Auth/SignUpStep1";
import { SignUpStep2 } from "../components/Auth/SignUpStep2";
import { SignUpStep3 } from "../components/Auth/SignUpStep3";

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
        <h1 className="text-xl font-medium mb-2">Sign up</h1>
        <h2 className="text-md font-medium mb-8">
          Step {step + 1} of 3: {stepNames[step]}
        </h2>
        {step === 0 ? <SignUpStep1 next={nextStep} /> : null}
        {step === 1 ? <SignUpStep2 next={nextStep} prev={prevStep} /> : null}
        {step === 2 ? <SignUpStep3 next={nextStep} prev={prevStep} /> : null}
        <p className="mt-8">
          Already have an account?{" "}
          <Link href="/signin">
            <a className="text-blue-dark">Sign in!</a>
          </Link>
        </p>
      </div>
    </AuthView>
  );
};

export default SignUp;
