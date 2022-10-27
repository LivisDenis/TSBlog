import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthSliceEnum, AuthStateType, UserRegisterType} from "./types";
import { fetchRegister } from "./AsyncActions";

const initialState: AuthStateType = {
    user: null,
    status: AuthSliceEnum.LOADING
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // register
        builder.addCase(fetchRegister.pending, state => {
            state.status = AuthSliceEnum.LOADING
        })
        builder.addCase(fetchRegister.fulfilled, (state: AuthStateType,  action: PayloadAction<UserRegisterType>) => {
            state.user = action.payload
            state.status = AuthSliceEnum.SUCCESS
        })
        builder.addCase(fetchRegister.rejected, state => {
            state.status = AuthSliceEnum.ERROR
        })
    },
})

const {reducer} = authSlice

export default reducer