import { AxiosError } from "axios";
import apiClient from "./apiClient";
interface IOperations {
  query: string;
  variables: {
    [key: string]: null;
  };
}

export class ApiError extends Error {
  public statusCode: number;
  public errors: any;

  constructor(message: string, statusCode: number = 500, errors: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "ApiError";
  }
}

export const graphQLMultipartRequest = async <T>(
  operations: IOperations,
  files: File[]
) => {
  try {
    const map: { [key: number]: string[] } = {};

    Object.keys(operations.variables).map((key, idx) => {
      map[`${idx}`] = [`varialbes.${key}`];
    });

    const formData = new FormData();

    formData.append("operations", JSON.stringify(operations));
    formData.append("map", JSON.stringify(map));

    files.forEach((file, idx) => {
      formData.append(`${idx}`, file);
    });

    const requestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "apollo-require-preflight": "true",
      },
    };
    const response = await apiClient.post<GraphQLResponse<T>>(
      "/graphql",
      formData,
      requestConfig
    );

    if (response.data.errors) {
      throw new ApiError(
        "GraphQL errors occurred",
        response.status,
        response.data.errors
      );
    }

    return response.data.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error("GraphQL request failed", error);
    if (error.response) {
      const res = error.response as any;
      throw new ApiError(
        res.data?.message || "An unexpected error occurred",
        error.response.status,
        res.data.errors || null
      );
    } else if (error.request) {
      throw new ApiError(
        "Network error: The request was made but no response was received",
        0
      );
    } else {
      throw new ApiError(error.message || "An unexpected error occurred");
    }
  }
};

 
export const graphQlRequest = async <T>(
  url: string,
  data?: { query: string | undefined; variables?: any }
): Promise<T> => {
  try {
    const response = await apiClient.post<GraphQLResponse<T>>(url, data);

    if (response.data.errors) {
      throw new ApiError(
        "GraphQL errors occurred",
        response.status,
        response.data.errors
      );
    }
    console.log(`[LOG] REQUEST SUCCESS`);

    return response.data.data as T;
  } catch (e) {
    const error = e as AxiosError;
    console.error("API request failed", error);

    if (error.response) {
      const res = error.response as any;
      throw new ApiError(
        res.data?.message || "An unexpected error occurred",
        error.response.status,
        res.data.errors || null
      );
    } else if (error.request) {
      throw new ApiError(
        "Network error: The request was made but no response was received",
        0
      );
    } else {
      throw new ApiError(error.message || "An unexpected error occurred");
    }
  }
};

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: Record<string, any>;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}
