import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import workReducer from '../features/work/workSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    work: workReducer,
  },
});
