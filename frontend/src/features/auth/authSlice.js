import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try{
        return await authService.register(user)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

//Update  user
export const update = createAsyncThunk('auth/update', async (updateData, thunkApi) => {
    try{
        const token = thunkApi.getState().auth.user.token
        const userId = thunkApi.getState().auth.user._id
        return await authService.update(updateData, token, userId)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

//Get  user
export const getMe = createAsyncThunk('auth/get', async (_,thunkApi) => {
    try{
        const token = thunkApi.getState().auth.user.token
        // Llama a la función `getMe` de `authService` y pasa el token
        const user = await authService.getMe(token);
        // Retorna el usuario obtenido como payload
        return user;
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

//Login user
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try{
        const userData = await authService.login(user)
        thunkApi.dispatch(setUser(userData)); // Actualiza el estado del usuario en Redux
        return userData;
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

// Define una acción para actualizar el estado del usuario en Redux
export const setUser = createAction('auth/setUser');

// Logout user

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => initialState,

    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(update.fulfilled, (state, action) =>{
            state.user = action.payload
        })
        .addCase(login.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(getMe.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer