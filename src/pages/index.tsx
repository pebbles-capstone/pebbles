import type { NextPage } from "next";
import { Button } from "../atoms/Button";

const Home: NextPage = () => {
  return (
    <>
      <header className="w-full flex flex-col items-center mt-16">
        <h1 className="font-sans-serif font-semibold text-xl md:text-xxxl w-full max-w-2xl px-4 md:px-0 text-center text-black leading-tight">
          Finding a team and supervisor for capstone has never been easier.
        </h1>
        <p className="font-sans-serif font-medium text-md w-full max-w-xl px-4 md:px-0 text-center text-black mt-8">
          Pebbles helps you find teammates and professors who are interested in
          working on similar things as yourself so you can focus on engineering.
        </p>
        <div className="w-full max-w-screen-2xl px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12 mt-20">
          <div className="w-full flex flex-col items-center">
            <span className="font-sans-serif font-semibold text-xxxl">1</span>
            <p className="font-sans-serif font-medium text-md md:text-lg text-center my-4">
              What interests you?
            </p>
            <p className="font-sans-serif font-normal text-base text-center px-4 md:px-0">
              Pebbles shows you past capstone projects that you can rate so we
              know what you’re interested in.
            </p>
          </div>
          <div className="w-full flex flex-col items-center md:mt-10">
            <span className="font-sans-serif font-semibold text-xxxl">2</span>
            <p className="font-sans-serif font-medium text-md md:text-lg text-center my-4">
              Potential teammates
            </p>
            <p className="font-sans-serif font-normal text-base text-center px-4 md:px-0">
              Based on your interests, we’ll show you potential teammates who
              are also interested similar past projects.
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <span className="font-sans-serif font-semibold text-xxxl">3</span>
            <p className="font-sans-serif font-medium text-md md:text-lg text-center my-4">
              Potential projects and supervisors
            </p>
            <p className="font-sans-serif font-normal text-base text-center px-4 md:px-0">
              We’ll also show you professors interested in similar projects so
              you know exactly who to email!
            </p>
          </div>
        </div>
      </header>
      <main className="mt-32 w-full max-w-screen-2xl px-4 md:px-16 flex flex-col">
        <section className="flex flex-col w-full">
          <h2 className="font-sans-serif font-semibold text-lg md:text-xl mb-4">
            Why use Pebbles
          </h2>
          <p className="max-w-xl mb-8">
            The process of finding a team, a professor your team would work well
            with, and a project idea was a handful. Pebbles makes this easier
            and these early users are excited for UofT Engineers of the future
            to try it out!
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            <div className="w-full h-48 md:h-96 rounded-md bg-grey"></div>
            <div className="w-full h-48 md:h-96 rounded-md bg-grey"></div>
            <div className="w-full h-48 md:h-96 rounded-md bg-grey"></div>
          </div>
        </section>
        <section className="flex flex-col w-full mt-20">
          <h2 className="font-sans-serif font-semibold text-lg md:text-xl mb-4">
            How it works
          </h2>
          <p className="max-w-xl mb-8">
            The process of finding a team, a professor your team would work well
            with, and a project idea was a handful. Pebbles makes this easier
            and these early users are excited for UofT Engineers of the future
            to try it out!
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="w-full h-48 md:h-96 rounded-md bg-grey"></div>
            <div className="w-full h-48 md:h-96 rounded-md bg-grey"></div>
          </div>
        </section>
        <div className="mt-12 my-24 w-full rounded-3xl bg-red-light px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center justify-between">
          <p className="font-sans-serif font-medium text-md mb-4 md:mb-0">
            Start finding projects and teammates today!
          </p>
          <Button
            type="border-primary"
            size="sm"
            isLink={true}
            isInternal={true}
            link="/signup"
            ariaLabel="Sign in"
            text="Sign up"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
