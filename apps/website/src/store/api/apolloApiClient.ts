import {
  ApolloClient,
  ApolloLink,
  concat,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import store from "../store";
import { refreshToken } from "../slice/authSlice";
import { Observable } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = store.getState().auth.access_token;
  console.log("TOKEN ", token);
  operation.setContext({
    headers: {
      "Apollo-Require-Preflight": "true",
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});
const httpLink = createUploadLink({
  uri: import.meta.env.VITE_BACKEND_BASE_URL+"/graphql",
  credentials: "include",
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        const extensions = err.extensions as any;
        console.error(`[ERROR WARNING]: `, extensions);
        console.log("UNauthenticated ", extensions.code === "UNAUTHENTICATED");
        if (extensions.code === "UNAUTHENTICATED") {
          return new Observable((observer) => {
            store
              .dispatch(refreshToken())
              .unwrap()
              .then(() => {
                const new_access_token = store.getState().auth.access_token;
                operation.setContext({
                  headers: {
                    ...operation.getContext().headers,
                    authorization: `Bearer ${new_access_token}`,
                  },
                });

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch((error) => {
                console.error("Token refresh failed", error);
                observer.error(error); // Propagate the error if refresh fails
              });
          });
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
);

export const apolloClient = new ApolloClient({
  link: from([errorLink, concat(authMiddleware, httpLink)]),
  cache: new InMemoryCache(),
});
