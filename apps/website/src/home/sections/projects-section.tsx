import React from "react";
import logo from "../../assets/logos/devops-2.svg";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";

function ProjectsSection() {
  const data = [
    {
      logo,
      title: "Grubhub",
      feature: ">1.3M",
      desc: "views",
      link: "#",
    },
    {
      logo,
      title: "NCR",
      feature: "3X",
      desc: "faster time to launch",
      link: "#",
    },
    {
      logo,
      title: "Dropbox Sign",
      feature: "4X",
      desc: "faster speed to market",
      link: "#",
    },
    {
      logo,
      title: "Refokus",
      feature: "200+",
      desc: "faster time to launch",
      link: "#",
    },
    {
      logo,
      title: "Refokus",
      feature: "200+",
      desc: "faster time to launch",
      link: "#",
    },
    {
      logo,
      title: "Refokus",
      feature: "200+",
      desc: "faster time to launch",
      link: "#",
    },
  ];
  const colors = [
    "#146ef5",
    "#ff6b00",
    "#ed52cb",
    "#ffae13",
    "#ee1d36",
    "#00d722",
    "#7a3dff",
  ];

  return (
    <div className="">
      <h1 className="container mx-auto text-5xl text-right text-white font-bold leading-tight">
        My Projects
      </h1>

      {/* cards */}
      <div className="flex gap-8 overflow-x-scroll no-scrollbar px-10 py-16 ">
        {data.map((data, idx) => (
          <CardLayout
            key={idx}
            className={`relative  min-w-[400px] text-white w-[400px] aspect-[8/9] transition duration-300 my-auto`}
            style={{
              borderColor: colors[idx],
            }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.backgroundColor = colors[idx];
              e.currentTarget.style.boxShadow = `0px 0px 155px ${colors[idx]} `;
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = `0px 0px 0px ${colors[idx]} `;
            }}
          >
            <SpeadedRadialGradient className="" />
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center mb-4">
                <img src={data.logo} alt="" className="h-8 mr-4" />
                <span className="font-bold text-lg">{data.title}</span>
              </div>

              <div className="flex flex-col items-start">
                <h4 className="text-6xl font-bold mb-2">{data.feature}</h4>
                <p className="text-2xl">{data.desc}</p>
              </div>
              <a href={data.link} className="group text-blue-500 mt-4">
                Read story <span>&rarr;</span>
              </a>
            </div>
          </CardLayout>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
