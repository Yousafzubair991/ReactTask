import { createSlice } from '@reduxjs/toolkit';
// import { AsyncStorage } from "react-native"
export const jwtSlice = createSlice({
  name: 'jwt',
  initialState: {
    token: '',
    user_id: '',
    userName: '',
    userEmail: '',
    userProfile: '',
    user: '',
  },
  reducers: {
    addJwtToken: (state, action) => {
      state.token = action.payload.token;
      // state.user_id = action.payload.user_id
    },
    removeJwtToken: (state, action) => {
      state.token = '';
      // state.user_id = action.payload.user_id
    },
    userInformation: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { addJwtToken, removeJwtToken, userInformation } = jwtSlice.actions;
export default jwtSlice.reducer;
