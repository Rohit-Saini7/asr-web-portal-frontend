import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
const store = configureStore({
  reducer: {
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
