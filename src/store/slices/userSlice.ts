import { RegularUser } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  userData?: RegularUser;
  token?: string;
  isLoggedIn: boolean;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  } as IUserState,
  reducers: {
    login: (state, action: PayloadAction<RegularUser>) => {
      state.userData = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    updateStoreUser: (state, action: PayloadAction<RegularUser>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = undefined;
      state.token = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, updateStoreUser } = userSlice.actions;

export default userSlice.reducer;
