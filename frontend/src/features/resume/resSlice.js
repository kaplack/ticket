import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumeService from './resumeService'

const initialState = {
    resume: {},
    message: ''
}

//Create resume
export const createResume= createAsyncThunk('resume/create', async (resumeData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const resume = await resumeService.createResume(resumeData, token)
        console.log(resume)
        return resume
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update resume
export const updateResume = createAsyncThunk('resume/update', async (resumeData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const resume = await resumeService.updateResume(resumeData, token)
        console.log("recepcion del slice: ", resume)
        return resume
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get resume
export const getResume = createAsyncThunk('resume/get', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const resume = await resumeService.getResume(token)
        console.log(resume)
        return resume
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// //Del CV
// export const delCvFile = createAsyncThunk('profile/delCv', async (fileId, thunkAPI) => {
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

export const resumeSlice = createSlice({
    name:'resume',
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(getResume.fulfilled, (state,action)=>{
            //state.message = "Se cargo la información"
            state.resume = action.payload
        })
    }
})

// export const {reset} = canSlice.actions
export default resumeSlice.reducer