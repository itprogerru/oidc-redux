import React, {FC, useCallback, useEffect} from 'react'
import {User, UserManager} from "oidc-client";
import {Store} from "@reduxjs/toolkit";
import {
    sessionTerminated,
    silentRenewError,
    userExpired,
    userExpiring,
    userFound,
    userSignedOut
} from '../Reducer/Reducer';
import {InMemoryWebStorage} from "../service/authenticationService";

interface Props {
    userManager: UserManager,
    store: Store,
}

export const OidcProvider: FC<Props> = ({ children, store, userManager}) => {

    // event callback when the user has been loaded (on silent renew or redirect)
   const onUserLoaded = useCallback((user: User) => {
        store.dispatch(userFound(user));
       localStorage.setItem('oidc', JSON.stringify(user))
    },[store]);

    // event callback when silent renew errored
   const onSilentRenewError = useCallback((error: any) => {
        store.dispatch(silentRenewError(error.message));
    },[store]);

    // event callback when the access token expired
   const onAccessTokenExpired = useCallback(() => {
        store.dispatch(userExpired());
    },[store]);

    // event callback when the user is logged out
   const onUserUnloaded = useCallback(() => {
        store.dispatch(sessionTerminated());
    },[store]);

    // event callback when the user is expiring
   const onAccessTokenExpiring = useCallback(() => {
        store.dispatch(userExpiring());
    },[store]);

    // event callback when the user is signed out
    const onUserSignedOut = useCallback(() => {
        store.dispatch(userSignedOut());
    },[store]);

    const onAddUserSessionChange = useCallback(()=>{
        console.log('start')
    },[])

    useEffect(()=> {
        userManager.events.addUserLoaded(onUserLoaded);
        userManager.events.addSilentRenewError(onSilentRenewError);
        userManager.events.addAccessTokenExpired(onAccessTokenExpired);
        userManager.events.addAccessTokenExpiring(onAccessTokenExpiring);
        userManager.events.addUserUnloaded(onUserUnloaded);
        userManager.events.addUserSignedOut(onUserSignedOut);
        return () =>  {
            userManager.events.removeUserLoaded(onUserLoaded);
            userManager.events.removeSilentRenewError(onSilentRenewError);
            userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
            userManager.events.removeAccessTokenExpiring(onAccessTokenExpiring);
            userManager.events.removeUserUnloaded(onUserUnloaded);
            userManager.events.removeUserSignedOut(onUserSignedOut);
        }
    },[onAccessTokenExpired, onAccessTokenExpiring, onSilentRenewError, onUserLoaded, onUserSignedOut, onUserUnloaded, userManager])



    return <>{children}</>
}
