import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  status: false,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action) => {
      state.error = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { addError, changeStatus } = errorSlice.actions;

export default errorSlice.reducer;
