import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import workReducer from '../features/work/workSlice'
import canReducer from '../features/candidate/canSlice'
import empReducer from '../features/employer/empSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    work: workReducer,
    candidate: canReducer,
    employer: empReducer,
  },
});
