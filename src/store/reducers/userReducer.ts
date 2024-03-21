import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUsers";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
  count: 0,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    dicrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    },
  },
});

export default userSlice.reducer;
