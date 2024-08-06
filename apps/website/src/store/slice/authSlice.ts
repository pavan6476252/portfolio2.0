import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/graphql",
        {
          query: `
          mutation {
            refreshTokens {
              access_token
            }
          }
        `,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data.refreshTokens.access_token;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);
interface IInitState {
  access_token: string | null;
  status: "idle" | "loading";
  error: string | null;
}
const initialState: IInitState = {
  access_token: null,
  status: "idle",
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.access_token = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
