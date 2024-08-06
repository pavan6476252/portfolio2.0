import React from "react";
import mobileAppLogo from "../../assets/logos/app-development-removebg-preview.png";
import backendLogo from "../../assets/logos/34877848-removebg-preview.png";
import devopsLogo from "../../assets/logos/devops-2.svg";
import CardLayout from "../../components/card-layout";
import { title } from "process";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
function MyAbilitiesSection() {
  const data = [
    {
      logo: backendLogo,
      title: "Web Developer",
      desc:
        "Building responsive and interactive web applications using modern frameworks and technologies.",
    },
    {
      logo: backendLogo,
      title: "Backend Developer",
      desc:
        "Designing and implementing scalable and reliable backend systems to support web and mobile applications.",
    },
    {
      logo: mobileAppLogo,
      title: "Mobile App Developer",
      desc:
        "Creating user-friendly and performant mobile applications for both Android and iOS platforms.",
    },
    {
      logo: devopsLogo,
      title: "DevOps",
      desc:
        "Ensuring seamless integration and delivery through automation, monitoring, and efficient infrastructure management.",
    },
  ];
  return (
    <div className="group relative container mx-auto  grid gap-5  grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
     
      <SpeadedRadialGradient className="left-0 right-0 w-0 h-0 top-0 bottom-0 group-hover:w-[50%] group-hover:h-[60vh] aspect-square   " />

      {data.map((data, idx) => (
        <CardLayout
          className={` relative group/${idx} flex flex-col justify-between gap-6`}
        >
        
          <SpeadedRadialGradient />

          <img src={data.logo} alt="" className="w-1/2" />
          <div>
            <h2 className="font-bold text-slate-100 text-2xl">{data.title}</h2>
            <br />
            <p className="font-thin text-slate-200">{data.desc}</p>
          </div>
        </CardLayout>
      ))}
    </div>
  );
}

export default MyAbilitiesSection;
