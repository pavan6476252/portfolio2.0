import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { IBlogResposne } from "../../dto/blogs.dto";
import LoadingSpinner from "../../components/loading-spinner";
import SEO from "../../components/seo";

const GET_BLOG_BY_SLUG = gql`
  query getBlog($slug: String!) {
    getBlogBySlug(slug: $slug) {
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
`;

function ShowSpecificBlogScreen() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <div> please provide valid url</div>;
  const { loading, error, data } = useQuery<{ getBlogBySlug: IBlogResposne }>(
    GET_BLOG_BY_SLUG,
    {
      variables: { slug: slug },
    }
  );
  console.log(loading, error, data);
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

  return (
    <>
      <SEO
        {...{
          description: data?.getBlogBySlug.metaDescription??"",
          keywords: data?.getBlogBySlug.metaKeywords??[],
          creatorName: data?.getBlogBySlug.author?.username ?? "",
          title: data?.getBlogBySlug.metaTitle??"",
          type: "",
        }}
      />
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <img
          src={data?.getBlogBySlug.coverImage}
          alt={data?.getBlogBySlug.metaTitle}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h1 className="text-3xl dark:text-white font-bold mt-4">
          {data?.getBlogBySlug.metaTitle}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {data?.getBlogBySlug.metaDescription}
        </p>
        <div className="flex items-center mt-4">
          <img
            src={data?.getBlogBySlug?.author?.picture}
            alt={data?.getBlogBySlug?.author?.username}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {data?.getBlogBySlug.author?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(
                parseInt(data?.getBlogBySlug?.createdAt ?? "0")
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <img
            src={data?.getBlogBySlug?.socialImage}
            alt="Social"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
        <div className="mt-4">
          {/* <div className="prose dark:prose-dark mt-2"> */}
          <MarkdownEditor.Markdown
            source={data?.getBlogBySlug?.markdownContent}
            className="p-2"
          />
          {/* </div> */}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Tech Stack:</h3>
          <div className="flex flex-wrap gap-2">
            {data?.getBlogBySlug.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-700 text-white px-4 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400">
              {data?.getBlogBySlug.likes} likes
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {data?.getBlogBySlug.metaKeywords.join(", ")}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowSpecificBlogScreen;
