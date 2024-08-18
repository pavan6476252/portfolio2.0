import { AxiosError } from "axios";
import apiClient from "./apiClient";

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

interface IOperations {
  query: string;
  variables: {
    [key: string]: any; // Changed to 'any' to allow null, string, File, etc.
  };
}

// export const graphQLMultipartRequest = async <T>(
//   operations: IOperations,
//   files: File[]
// ) => {
//   try {
//     const map: { [key: string]: string[] } = {};
//     const nullifiedObject = Object.entries(operations.variables).reduce(
//       (acc: { [key: string]: any }, [key, _]) => {
//         acc[key] = null;
//         return acc;
//       },
//       {}
//     );
//     console.log(nullifiedObject);

//     Object.keys(nullifiedObject).forEach((key, idx) => {
//       map[idx.toString()] = [`variables.${key}`];
//     });
//     console.log(map);
//     const formData = new FormData();
//     const newData:IOperations ={query : operations.query,
//       variables:nullifiedObject
//     }

//     console.log(newData)
//     formData.append("operations", JSON.stringify(newData));
//     formData.append("map", JSON.stringify(map));

//     Object.entries(operations.variables).forEach((key, idx) => {
//       // if (key[1] instanceof File) {
//         console.log(idx.toString(), key[1]);
//         formData.append(idx.toString(), key[1]);
//       // }
//     });

//     const response = await apiClient.post<GraphQLResponse<T>>(
//       "/graphql",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "apollo-require-preflight": "true",
//         },
//       }
//     );
//     console.log(response.data);

//     if (response.data.errors) {
//       throw new ApiError(
//         "GraphQL errors occurred",
//         response.status,
//         response.data.errors
//       );
//     }

//     return response.data.data as T;
//   } catch (e) {
//     const error = e as AxiosError;
//     console.error("GraphQL request failed", error);

//     if (error.response) {
//       const res = error.response as any;
//       throw new ApiError(
//         res.data?.message || "An unexpected error occurred",
//         error.response.status,
//         res.data.errors || null
//       );
//     } else if (error.request) {
//       throw new ApiError(
//         "Network error: The request was made but no response was received",
//         0
//       );
//     } else {
//       throw new ApiError(error.message || "An unexpected error occurred");
//     }
//   }
// };

export const graphQLMultipartRequest = async <T>(
  operations: IOperations,
  files: File[]
) => {
  try {
    const map: { [key: string]: string[] } = {};
    const nullifiedObject = Object.entries(operations.variables).reduce(
      (acc: { [key: string]: any }, [key, _]) => {
        acc[key] = null;
        return acc;
      },
      {}
    );

    Object.keys(nullifiedObject).forEach((key, idx) => {
      map[idx.toString()] = [`variables.${key}`];
    });

    const formData = new FormData();
    const newData: IOperations = {
      query: operations.query,
      variables: nullifiedObject,
    };

    formData.append("operations", JSON.stringify(newData));
    formData.append("map", JSON.stringify(map));

    Object.entries(operations.variables).forEach(([key, value], idx) => {
      if (value instanceof File) {
        console.log(key, value);
        formData.append(idx.toString(), value);
      }
    });

    const response = await apiClient.post<GraphQLResponse<T>>(
      "/graphql",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "apollo-require-preflight": "true",
        },
      }
    );
    console.log(response.data);
    if (response.data.errors) {
      throw new ApiError(
        "GraphQL errors occurred",
        response.status,
        response.data.errors
      );
    }

    return response.data.data as T;
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
      console.log(response.data.errors);
      throw new ApiError(
        "GraphQL errors occurred",
        response.status,
        response.data.errors
      );
    }
    console.log(`[LOG] REQUEST SUCCESS`);

    return response.data.data as T;
  } catch (e) {
    if (e instanceof AxiosError) {
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
    }else{
      throw e;
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
