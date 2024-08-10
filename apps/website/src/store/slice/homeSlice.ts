import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import apiClient from "../api/apiClient";
import { IResumeProfile } from "../dtos/resume-profile.dto";
import { AxiosError } from "axios";
import { ApiError, graphQlRequest } from "../api/gqlRequest";

const GET_PROFILE_QUERY = gql`
  query CurrentResumeProfile {
    currentResumeProfile {
      fullName
      tagline
      description
      domains
      heroTitle
      heroDescription
      socialPlatforms {
        link
        name
      }
      developerTools {
        name
        type
      }
      abilities {
        title
        description
        type
      }
      user {
        picture
        username
        email
        role
      }
    }
  }
`;
interface UserState {
  resume: IResumeProfile | null;
  loading: boolean;
  error: ApiError | null;
}

const initialState: UserState = {
  resume: null,
  loading: false,
  error: null,
};

// export const fetchHomePageResume = createAsyncThunk(
//   "home/fetchHomePageResume",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.post("/graphql", {
//         query: GET_PROFILE_QUERY.loc?.source.body,
//       });
//       const data = response.data.data.currentResumeProfile;

//       return data as IResumeProfile;
//     } catch (e) {
//       return rejectWithValue(e as AxiosError);
//     }
//   }
// );
export const fetchHomePageResume = createAsyncThunk<IResumeProfile, void>(
  "home/fetchHomePageResume",
  async (_, { rejectWithValue }) => {
    try {
      const response = await graphQlRequest<{
        currentResumeProfile: IResumeProfile;
      }>("/graphql", {
        query: GET_PROFILE_QUERY.loc?.source.body,
      });

      return response.currentResumeProfile;
    } catch (e) {
      return rejectWithValue(e as ApiError);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateProfileUrl: (state, action) => {
      if (state.resume) {
        state.resume.user = { ...state.resume.user, picture: action.payload };
      }
    },
    updateProfile: (state, action) => {
      if (state.resume) {
        state.resume = { ...state.resume, ...action.payload};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePageResume.fulfilled, (state, action) => {
        state.resume = action.payload;
        state.loading = false;
      })
      .addCase(fetchHomePageResume.rejected, (state, action) => {
        state.error = action.payload as ApiError;
        state.loading = false;
      });
  },
});
export const { updateProfileUrl ,updateProfile} = homeSlice.actions;
export default homeSlice.reducer;
