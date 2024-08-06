import axios from "axios";
import apiClient from "../apiClient";

export const fetchBlogs = async (
  limit: number,
  offset: number,
  filter: {
    title?: string;
    content?: string;
    tags?: string[];
  }
) => {
  const query = ` 
    query GetAllPosts($limit: Float!, $offset: Float!, $filter: FilterInput!) {
      getAllPosts(limit: $limit, offset: $offset, filter: $filter) {
        title
        content
        likes
        commentCount
        author {
          picture
          email
        }
        tags {
          name
          id
        }
      }
    }
  `;

  const variables = { limit, offset, filter };

  try {
    const response = await apiClient.post(
      "/graphql",
      {
        query,
        variables,
      },
      { withCredentials: true }
    );

    return response.data.data.getAllPosts;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
