import React from "react";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";

function MakeItYoursComponent() {
  return (
    <section className="relative py-32 bg-black">
      <SpeadedRadialGradient className="absolute -bottom-10" />
      <div className="relative container mx-auto grid gap-5 grid-cols-1 lg:grid-cols-2">
        <h1 className="col-span-1 text-white text-8xl font-bold leading-tight">
          Get started <br />
          Make it your!
        </h1>
        <div className="col-span-1 lg:col-span-1 place-self-center">
          <div className="max-w-xl text-white flex flex-col items-start justify-center">
            <p className="text-2xl leading-snug">
              With Webflow’s visual-first platform, marketers, designers, and devs
              alike can create, optimize, and scale web experiences that get
              results — all backed by enterprise-grade hosting and security.
            </p>
            <br />
            <br />
            <button className="relative inline-block font-medium group py-3 px-8">
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-indigo-600 group-hover:bg-indigo-50"></span>
              <span className="relative text-indigo-600">it's open-source</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MakeItYoursComponent;
