import { RegularUser } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type IGuestState = Pick<
  RegularUser,
  | 'firstName'
  | 'lastName'
  | 'phoneNumber'
  | 'email'
  | 'correlationId'
  | 'email'
  | 'phoneNumber'
>;

const guestUserId = uuidv4();

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  } as IGuestState,
  reducers: {
    setGuestUserData: (state, action: PayloadAction<IGuestState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.correlationId = guestUserId;
    },
  },
});

export const { setGuestUserData } = userSlice.actions;

export default userSlice.reducer;
