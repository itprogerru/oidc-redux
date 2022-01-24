import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "oidc-client";

export interface UserState {
    isLoading: boolean;
    user: User | null;
    error: string | null,
}

const initialState: UserState = {
    isLoading: false,
    user: localStorage.getItem('oidc') ? JSON.parse(localStorage.getItem('oidc') as any) : null ,
    error: null,
}

const defaultFunc = (state: typeof initialState) => {state.isLoading = false; state.user=null; state.error=null}

const slice = createSlice({
    name: 'oidc-redux',
    initialState,
    reducers: {
        userExpired: defaultFunc,
        sessionTerminated:  defaultFunc,
        userSignedOut: defaultFunc,
        userExpiring: defaultFunc,
        userFound: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        loadingUser: (state) => {
            state.isLoading = true;
        },
        loadUserError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
        },
        silentRenewError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
        },
    }
})

export const {userExpired, silentRenewError, sessionTerminated, userFound, loadingUser, userSignedOut, loadUserError, userExpiring} = slice.actions
export const OidcReducer = slice.reducer;
