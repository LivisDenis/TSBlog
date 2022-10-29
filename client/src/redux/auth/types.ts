import {UserType} from "../posts/types";

export enum AuthSliceEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type UserRegisterType = {
    email: string
    fullName: string
    password: string
}

export type UserLoginType = {
    email: string
    password: string
}

export type AuthStateType = {
    user: UserType | null
    status: AuthSliceEnum
}