import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AuthView } from "../components/auth/AuthView";
import { SignUpStep1 } from "../components/auth/SignUpStep1";
import { SignUpStep2 } from "../components/auth/SignUpStep2";
import { SignUpStep3 } from "../components/auth/SignUpStep3";
import { SignUpStep4 } from "../components/auth/SignUpStep4";
import { Discipline, Area } from "../types";

const stepNames: { [key: number]: string } = {
  0: "General information",
  1: "ECE information",
  2: "Interests",
  3: "Confirmation",
};

const SignUp: NextPage = () => {
  // Step state controls which part of signup user sees
  // step 0 => general info
  // step 1 => ECE info
  // step 2 => interests info
  // step 3 => signup confirmation
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step !== 3) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step !== 0) setStep((prev) => prev - 1);
  };

  // signup values so far
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [discipline, setDiscipline] = useState<Discipline>("Computer");
  const [areas, setAreas] = useState<Area[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  // signup value handlers
  const setSavedEmail = (email: string) => setEmail(email);
  const setSavedName = (name: string) => setName(name);
  const setSavedPassword = (password: string) => setPassword(password);
  const setSavedConfirmPassword = (confirmPassword: string) =>
    setConfirmPassword(confirmPassword);
  const setSavedDiscipline = (discipline: Discipline) =>
    setDiscipline(discipline);
  const setSavedAreas = (areas: Area[]) => setAreas((prev) => [...areas]);
  const setSavedInterests = (interests: string[]) =>
    setInterests((prev) => [...interests]);

  return (
    <AuthView>
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-medium mb-2">Sign up</h1>
        <h2 className="text-md font-medium mb-8">
          Step {step + 1} of 3: {stepNames[step]}
        </h2>
        {step === 0 ? (
          <SignUpStep1
            next={nextStep}
            email={email}
            name={name}
            password={password}
            confirmPassword={confirmPassword}
            setSavedEmail={setSavedEmail}
            setSavedName={setSavedName}
            setSavedPassword={setSavedPassword}
            setSavedConfirmPassword={setSavedConfirmPassword}
          />
        ) : null}
        {step === 1 ? (
          <SignUpStep2
            next={nextStep}
            prev={prevStep}
            discipline={discipline}
            areas={areas}
            setSavedDiscipline={setSavedDiscipline}
            setSavedAreas={setSavedAreas}
          />
        ) : null}
        {step === 2 ? (
          <SignUpStep3
            next={nextStep}
            prev={prevStep}
            email={email}
            name={name}
            password={password}
            confirmPassword={confirmPassword}
            discipline={discipline}
            areas={areas}
            interests={interests}
            setSavedInterests={setSavedInterests}
          />
        ) : null}
        {step === 3 ? <SignUpStep4 email={email} password={password} /> : null}
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
