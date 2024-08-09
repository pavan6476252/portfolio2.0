import React from "react";
import { useAppSelector } from "../../store/store";

const IntroSection: React.FC = () => {
  const resumeState = useAppSelector((state) => state.home);

  if (
    !resumeState.resume ||
    resumeState.loading ||
    resumeState.resume?.heroTitle == undefined ||
    resumeState.resume.heroDescription == undefined ||
    resumeState.loading
  ) {
    return null;
  }

  const { heroTitle, heroDescription } = resumeState.resume;

  return (
    <div className="font-workSans flex flex-col gap-10 justify-center items-center">
      <h1 className="text-center font-bold text-5xl text-white">
        {heroTitle.split("\\n").map((line, index) => (
          <span key={index}>
            {line}
            {index !== heroTitle.split("\\n").length - 1 && <br />}
          </span>
        ))}
      </h1>

      <p className="text-center text-xl text-slate-300 max-w-3xl">
        {heroDescription}
      </p>
    </div>
  );
};

export default IntroSection;
