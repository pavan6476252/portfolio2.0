import { Link } from "react-router-dom";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
import { FaYoutube } from "react-icons/fa";

function MakeItYoursComponent() {
  return (
    <section className="relative py-32 bg-black">
      <SpeadedRadialGradient className="absolute -bottom-10" />
      <div className="relative container mx-auto grid gap-5 grid-cols-1 lg:grid-cols-2">
        <h1 className="col-span-1 place-self-center text-white text-8xl font-bold leading-tight">
          Get started <br />
          Make it yours!
        </h1>
        <div className="col-span-1 lg:col-span-1 lg:place-self-center">
          <div className="max-w-xl text-white flex flex-col items-start justify-center">
            <p className="text-2xl leading-snug">
              This website provides a simple portfolio where anyone can clone
              and deploy it. Start editing the data on the page itself, and it
              will store the information in the database and show up-to-date
              information in your portfolio.
            </p>
            <p className="text-2xl leading-snug mt-4">
              With an intuitive interface, you can customize your portfolio to
              reflect your personal brand, showcase your projects, and share
              your journey with the world.
            </p>
            <p className="text-2xl leading-snug mt-4">
              Get started quickly with our easy-to-use tools and ensure your
              portfolio always looks professional and is up-to-date.
            </p>
            <br />
            <br />
            <div className="flex gap-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={"https://github.com/pavan6476252/portfolio2.0"}
                className="relative inline-block font-medium group py-3 px-8"
              >
                <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border border-indigo-600 group-hover:bg-indigo-50"></span>
                <span className="relative text-indigo-600">
                  It's open-source
                </span>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={"https://github.com/pavan6476252/portfolio2.0"}
                className="relative inline-block font-medium group py-3 px-8"
              >
                <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border border-red-600 group-hover:bg-indigo-50"></span>
                <span className="relative text-red-600 flex gap-2 items-center" >View Demo <FaYoutube size={25} className="text-red-500"/></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MakeItYoursComponent;
