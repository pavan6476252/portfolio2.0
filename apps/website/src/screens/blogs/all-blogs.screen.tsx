import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";

import logo from "../../assets/logos/PavanKumarLogo.svg";
import { FaGithub } from "react-icons/fa";
import { IBlogResposne } from "../../dto/blogs.dto";
import LoadingSpinner from "../../components/loading-spinner";
const GET_PAGINATED_BLOGS = gql`
  query getPaginatedBlogs {
    getActiveBlogs(limit: 10, offset: 0) {
      total
      result {
        id
        metaTitle
        metaDescription
        metaKeywords
        markdownContent
        slug
        coverImage
        socialImage
        author {
          id

          picture
          email
          username
        }
        likes
        createdAt
        updatedAt
        visible
      }
    }
  }
`;

function AllBLogsScreen() {
  const { loading, error, data } = useQuery<{
    getActiveBlogs: {
      total: number;
      result: IBlogResposne[];
    };
  }>(GET_PAGINATED_BLOGS, {
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
  console.log(data?.getActiveBlogs.result);
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
      <h1 className="font-bold text-lg">All Blogs</h1>
      <br />
      <div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {data?.getActiveBlogs.result.map((blog, idx) => (
            <CardLayout
              key={blog.id}
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
              <Link to={`/blogs/${blog.slug}`}>
                <SpeadedRadialGradient className="" />
                <div className="flex flex-col justify-between  ">
                  <img
                    src={blog?.socialImage || logo}
                    alt=""
                    className="w-full h-auto  aspect-video object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex flex-col items-start">
                      <h4 className="text-lg text-left font-bold mb-2">
                        {blog.metaTitle}
                      </h4>
                      <p className="text-left">{blog.metaDescription}</p>
                    </div>

                    <div className="flex flex-wrap mt-4">
                      {blog.metaKeywords.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-800 text-white px-2 py-1 rounded mr-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default AllBLogsScreen;
