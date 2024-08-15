import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { graphQlRequest } from "../../store/api/gqlRequest";
import { IProjectResposne } from "../../dto/project.dto";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner";
import { gql, useQuery } from "@apollo/client";
import { IBlogResposne } from "../../dto/blogs.dto";
const GET_MY_BLOGS = gql`
  query {
    getCurrentUserActiveBlogs {
      id
      slug
      coverImage
      socialImage
      author {
        id
        email
        username
      }
      tags {
        id
        name
      }
      likes
      createdAt
      updatedAt
      visible
      metaTitle
      metaDescription
      metaKeywords
      markdownContent
    }
  }
`;
const AdminBlogsScreen: React.FC = () => {
  const { loading, error, data } = useQuery<{
    getCurrentUserActiveBlogs: IBlogResposne[];
  }>(GET_MY_BLOGS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <div className="container mx-auto p-4 dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">My Blogs </h1>
        <Link
          to={"new"}
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-700"
        >
          New Blog
        </Link>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : data?.getCurrentUserActiveBlogs.length == 0 ? (
        <div className="text-slate-100">
          Oops not Blogs found . add your Blog
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.getCurrentUserActiveBlogs.map((project) => (
            <div
              key={project.metaTitle}
              className="relative border rounded-lg p-4 shadow"
            >
              <Link
                to={`edit/${project.id}`}
                className="absolute top-5 right-5 px-3 py-1 bg-indigo-500"
              >
                Edit
              </Link>
              <div
                className={`absolute top-5 left-5 px-3 py-1 ${
                  project.visible ? "bg-green-800" : "bg-red-200"
                }`}
              >
                {project.visible?"Visible":"Hidden"}
              </div>
              <img
                src={project.coverImage}
                alt={project.metaTitle}
                className="mb-4 w-full h-32 object-cover"
              />
              <h2 className="text-xl font-semibold mb-2">
                {project.metaTitle}
              </h2>
              <p className="text-sm mb-2">{project.metaDescription}</p>

              <Link
                to={project.slug ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Project Link
              </Link>
              <div className="mt-2">
                <span className="text-sm text-gray-500">
                  Tech Stack: {project.tags?.map((t) => t.name).join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogsScreen;
