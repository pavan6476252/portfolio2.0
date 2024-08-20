import { useQuery, gql } from "@apollo/client";
import { IProjectResposne } from "../../dto/project.dto";
import { Link } from "react-router-dom";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";

import logo from "../../assets/logos/PavanKumarLogo.svg";
import { FaGithub } from "react-icons/fa";
import LoadingSpinner from "../../components/loading-spinner";
const GET_PAGINATED_PROJECTS = gql`
  query getPaginatedProjects($limit: Int!, $offset: Int!) {
    getActiveProjects(limit: $limit, offset: $offset) {
      total
      result {
        id
        bannerImg
        title
        slug
        projectLink
        startDate
        endDate
        techStack
        keypoints
        isActive
      }
    }
  }
`;

function AllProjectsScreen() {
  const { loading, error, data } = useQuery<{
    getActiveProjects: {
      total: number;
      result: IProjectResposne[];
    };
  }>(GET_PAGINATED_PROJECTS, {
    variables: { limit: 10, offset: 0 },
  });
  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        {" "}
        Error: {error.message}
      </div>
    );
  console.log(data?.getActiveProjects.result);
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
    <div className="dark:text-white container mx-auto">
      <br />
      <br />
      <br />
      <h1 className="font-bold text-lg">All Projects</h1>
      <br />
      <div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 ">
          {data?.getActiveProjects.result.map((project, idx) => (
            <CardLayout
              key={project.id}
              className={`  relative  text-white   transition duration-300 my-auto flex flex-col`}
              style={{
                borderColor: colors[idx % colors.length],
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.backgroundColor =
                  colors[idx % colors.length];
                e.currentTarget.style.boxShadow = `0px 0px 155px ${
                  colors[idx % colors.length]
                }`;
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = `0px 0px 0px ${
                  colors[idx % colors.length]
                }`;
              }}
            >
              <Link to={`/projects/${project.id}`}>
                <SpeadedRadialGradient className="" />
                <div className="flex flex-col justify-between  ">
                  <img
                    src={project?.bannerImg || logo}
                    alt=""
                    className="w-full h-auto  aspect-video object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex flex-col items-start">
                      <h4 className="text-lg text-left font-bold mb-2">
                        {project.metaTitle}
                      </h4>
                      <p className="text-left">{project.metaDescription}</p>
                    </div>

                    <div className="flex flex-wrap mt-4">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-800 text-white px-2 py-1 rounded mr-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={project.projectLink}
                      className="group absolute bottom-5 right-5 flex items-center gap-2 text-blue-500"
                    >
                      View Project <FaGithub />
                    </Link>
                  </div>
                </div>
              </Link>
            </CardLayout>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProjectsScreen;
