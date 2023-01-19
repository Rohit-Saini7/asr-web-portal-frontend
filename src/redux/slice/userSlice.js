import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  docs: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addDocs: (state, action) => {
      state.docs = [...state.docs, action.payload];
    },
    setDocs: (state, action) => {
      state.docs = action.payload;
    },
  },
});

export const { addUser, addDocs, setDocs } = userSlice.actions;

export default userSlice.reducer;
