import authService from './authService'
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// Get user from localStorage
//createAsyncThunk ~ middleware for async functions;

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const userData = {
  email: "smithwills1989@gmail.com",
  password: "12345678"
}


// Login Auth Thunk file
export const login = createAsyncThunk('auth/login', async (_, thunkAPI) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //reset is dispatched after the action set values
    //is set to false
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  //thunkAPI functions are passed to the extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userData = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userData = null
      })
  },
})

export const {reset} = authSlice.actions
export default authSlice.reducer