import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { useAppSelector } from "../store";
import apiClient from "../api/apiClient";
import { IUser } from "../dtos/user.dto";
// Define the GraphQL query
const GET_PROFILE_QUERY = gql`
  query GetProfile {
    getProfile {
      id
      username
      picture
      email
      role
    }
  }
`;

// Define the state type
interface UserState {
  user: IUser| null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Create async thunk to fetch the user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post("/graphql", {
        query: `
          query {
            getProfile {
              id
              username
              picture
              email
              role
            }
          }
        `,
      });
      console.log(data)
      return data.data.getProfile;
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Export the reducer
export default userSlice.reducer;
