import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workService from './workService'


const initialState = {
    allWorks: [],
    works: [],
    work: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new job
export const createWork = createAsyncThunk('works/create', async (workData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await workService.createWork(workData, token)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get user jobs post
export const getWorks = createAsyncThunk('works/getWorks', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await workService.getWorks( token)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get user job
export const getWork = createAsyncThunk('works/get', async (workId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await workService.getWork(workId, token)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Update job
export const updateWork = createAsyncThunk('works/update', async ( workData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await workService.updateWork(workData, token)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete job
export const deleteWork = createAsyncThunk('works/delete', async ( workId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await workService.deleteWork( workId, token)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all job
export const getAllWorks = createAsyncThunk('works/getAllWorks', async (_, thunkAPI) => {
    try{
        //const token = thunkAPI.getState().auth.user.token
        return await workService.getAllWorks()
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const workSlice = createSlice({
    name:'work',
    initialState,
    reducers:{
        reset: (state) => initialState,

    },
    extraReducers: (builder)=> {
        builder
        .addCase(createWork.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createWork.fulfilled, (state)=>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createWork.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getWorks.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getWorks.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.works = action.payload
        })
        .addCase(getWorks.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getWork.fulfilled, (state, action)=>{
            state.work = action.payload
        })
        .addCase(getAllWorks.fulfilled, (state, action) => {
            state.allWorks = action.payload
        })
    }
})

export const {reset} = workSlice.actions
export default workSlice.reducer