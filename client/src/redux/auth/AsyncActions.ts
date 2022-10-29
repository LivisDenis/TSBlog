import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";
import {UserRegisterType} from "./types";

export const fetchRegister = createAsyncThunk(
    'posts/fetchRegister',
    async (params: UserRegisterType) => {
        const response = await axios.post('/auth/registration', params)

        return response.data
    }
)

export const fetchLogin = createAsyncThunk(
    'posts/fetchLogin',
    async () => {
        const response = await axios.post('/auth/login')
        return response.data
    }
)

export const fetchAuth = createAsyncThunk(
    'posts/fetchAuth',
    async () => {
        const response = await axios.get('/auth/me')
        return response.data
    }
)