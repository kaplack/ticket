import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import empService from './employerService'

const initialState = {
    employer: {},
    allEmployers:{},
    message: ''
}

//Create profile
export const createEmpProfile = createAsyncThunk('emp/create', async (empData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const employer = await empService.createProfile(empData, token)
        console.log(employer)
        return employer
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update profile
export const updateProfile = createAsyncThunk('emp/update', async (empData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const employer = await empService.updateProfile(empData, token)
        console.log("recepcion del slice: ", employer)
        return employer
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get profile
export const empGetProfile = createAsyncThunk('emp/get', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const employer = await empService.empGetProfile(token)
        console.log(employer)
        return employer
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all profiles
export const empGetAllProfile = createAsyncThunk('emp/getAllEmployers', async (_, thunkAPI) => {
    try{
        //const token = thunkAPI.getState().auth.user.token
        const employer = await empService.empGetAllProfile()
        console.log(employer)
        return employer
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Del profile
// export const delCvFile = createAsyncThunk('emp/delProf', async (fileId, thunkAPI) => {
//     try{
//         const token = thunkAPI.getState().auth.user.token
//         const candidate = await canService.delCvFile(fileId, token)
//         console.log(candidate)
//         return candidate
//     }catch (error){
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

export const empSlice = createSlice({
    name:'employer',
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(updateProfile.fulfilled, (state,action)=>{
            //state.message = "Se cargo la información"
            state.employer = action.payload
        })
        .addCase(empGetProfile.fulfilled, (state,action)=>{
            //state.message = "Se cargo la información"
            state.employer = action.payload
        })
        .addCase(empGetAllProfile.fulfilled, (state,action)=>{
            //state.message = "Se cargo la información"
            state.allEmployers = action.payload
        })
        // .addCase(delCvFile.rejected, (state,action)=>{
        //     //state.message = "Se cargo la información"
        //     state.message = action.payload
        // })
    }
})

// export const {reset} = canSlice.actions
export default empSlice.reducer