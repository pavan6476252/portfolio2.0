import React from "react";
import { useQuery, gql } from "@apollo/client";
import CardLayout from "../../components/card-layout";
import { IBlogResposne } from "../../dto/blogs.dto";

// GraphQL query to fetch blogs
const GET_USER_BLOGS = gql`
  query GetCurrentUserActiveBlogs {
    getCurrentUserActiveBlogs {
      id
      metaTitle
      metaDescription
      metaKeywords
      slug
      socialImage
      likes
      createdAt
    }
  }
`;

function BlogSection() {
  const { loading, error, data } = useQuery<{
    getCurrentUserActiveBlogs: Partial<IBlogResposne>[];
  }>(GET_USER_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <div className="container mx-auto">
        <h2 className="text-6xl text-white text-left font-bold mb-4 leading-tight">
          Explore some blogs
        </h2>
        <p className="text-xl mb-12 text-left text-white">
          Browse the Marketplace, educational videos, and customer stories.
        </p>
      </div>
      <div className="flex pl-14 gap-8 overflow-x-scroll no-scrollbar">
        {data?.getCurrentUserActiveBlogs.map((blog) => (
          <CardLayout
            key={blog.id}
            className="min-w-[400px] text-white w-[400px] aspect-[8/9] border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={blog.socialImage}
              alt={blog.metaTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col items-start">
              <h3 className="text-2xl font-semibold mb-2 text-left">
                {blog.metaTitle || "Untitled Blog"}
              </h3>
              <p className="text-gray-700 text-left mb-4">
                {blog.metaDescription || "No description available."}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Keywords: {blog.metaKeywords ?? [].join(", ")}
              </p>
              <p className="text-sm text-gray-500 mb-4">Likes: {blog.likes}</p>
              <p className="text-sm text-gray-500">
                Published on:
                {blog.createdAt!==undefined
                  ? new Date(parseInt(blog.createdAt)).toLocaleDateString()
                  : "Date not available"}
              </p>
            </div>
          </CardLayout>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
