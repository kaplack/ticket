import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import canService from './candidateService'

const initialState = {
    candidate: {},
    message: ''
}

//Create profile
export const createProfile = createAsyncThunk('profile/create', async (candidateData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const candidate = await canService.createProfile(candidateData, token)
        console.log(candidate)
        return candidate
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update profile
export const updateProfile = createAsyncThunk('profile/update', async (candidateData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const candidate = await canService.updateProfile(candidateData, token)
        console.log("recepcion del slice: ", candidate)
        return candidate
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get profile
export const canGetProfile = createAsyncThunk('profile/get', async (candidateData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const candidate = await canService.canGetProfile(token)
        console.log(candidate)
        return candidate
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Del CV
export const delCvFile = createAsyncThunk('profile/delCv', async (fileId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const candidate = await canService.delCvFile(fileId, token)
        console.log(candidate)
        return candidate
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const canSlice = createSlice({
    name:'candidate',
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(canGetProfile.fulfilled, (state,action)=>{
            //state.message = "Se cargo la información"
            state.candidate = action.payload
        })
        .addCase(delCvFile.rejected, (state,action)=>{
            //state.message = "Se cargo la información"
            state.message = action.payload
        })
    }
})

// export const {reset} = canSlice.actions
export default canSlice.reducer