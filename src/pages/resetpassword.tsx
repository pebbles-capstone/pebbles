import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AuthView } from "../components/Auth/AuthView";
import { ResetPasswordStep1 } from "../components/Auth/ResetPasswordStep1";
import { ResetPasswordStep2 } from "../components/Auth/ResetPasswordStep2";

const stepNames: { [key: number]: string } = {
  0: "Email",
  1: "New password",
};

const ResetPassword: NextPage = () => {
  // Step state controls which part of signup user sees
  // step 0 => Email
  // step 1 => New password
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step !== 1) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step !== 0) setStep((prev) => prev - 1);
  };

  // reset password values so far
  const [email, setEmail] = useState("");

  // reset password value handlers
  const setSavedEmail = (email: string) => setEmail(email);

  return (
    <AuthView>
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-medium mb-2">Reset password</h1>
        <h2 className="text-md font-medium mb-8">
          Step {step + 1} of 2: {stepNames[step]}
        </h2>
        {step === 0 ? (
          <ResetPasswordStep1
            next={nextStep}
            email={email}
            setSavedEmail={setSavedEmail}
          />
        ) : null}
        {step === 1 ? <ResetPasswordStep2 email={email} /> : null}
        <p className="mt-8">
          Know your password?{" "}
          <Link href="/signin">
            <a className="text-blue-dark">Sign in!</a>
          </Link>
        </p>
      </div>
    </AuthView>
  );
};

export default ResetPassword;
