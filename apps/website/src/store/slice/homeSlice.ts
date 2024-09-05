import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import apiClient from "../api/apiClient";
import { IResumeProfile } from "../dtos/resume-profile.dto";
import { AxiosError } from "axios";
import { ApiError, graphQlRequest } from "../api/gqlRequest";
import { IProjectResposne } from "../../dto/project.dto";
import { IBlogResposne } from "../../dto/blogs.dto";

const GET_PROFILE_QUERY = gql`
  query CurrentResumeProfile {
    getPortfolio {
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

    getCurrentUserActiveProjects {
      id
      author {
        picture
        username
      }
      title
      metaTitle
      metaDescription
      slug
      bannerImg
      projectLink
      startDate
      endDate
      techStack
      isActive
    }

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
interface UserState {
  resume: IResumeProfile | null;
  projects: IProjectResposne[] | null;
  blogs: Partial<IBlogResposne>[] | null;
  loading: boolean;
  error: ApiError | null;
}

const initialState: UserState = {
  resume: null,
  blogs: null,
  projects: null,
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

export const fetchHomePageResume = createAsyncThunk<
  {
    getPortfolio: IResumeProfile | null;
    getCurrentUserActiveProjects: IProjectResposne[] | null;
    getCurrentUserActiveBlogs: Partial<IBlogResposne>[] | null;
  },
  void,
  { rejectValue: any }
>("home/fetchHomePageResume", async (_, { rejectWithValue }) => {
  try {
    const response = await graphQlRequest<{
      getPortfolio: IResumeProfile | null;
      getCurrentUserActiveProjects: IProjectResposne[] | null;
      getCurrentUserActiveBlogs: Partial<IBlogResposne>[] | null;
    }>("/graphql", {
      query: GET_PROFILE_QUERY.loc?.source.body,
    });
console.log(response)
    return response;
  } catch (e) {
    console.log(e);
    return rejectWithValue(e as ApiError);
  }
});

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
        state.resume = { ...state.resume, ...action.payload };
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
        state.resume = action.payload.getPortfolio;
        state.projects = action.payload.getCurrentUserActiveProjects;
        state.blogs = action.payload.getCurrentUserActiveBlogs;
        state.loading = false;
      })
      .addCase(fetchHomePageResume.rejected, (state, action) => {
        state.error = action.payload as ApiError;
        state.loading = false;
      });
  },
});
export const { updateProfileUrl, updateProfile } = homeSlice.actions;
export default homeSlice.reducer;
