import React, {FC, useCallback, useEffect} from 'react';
import {User, UserManager} from "oidc-client";

interface Props {
    userManager: UserManager;
    successCallback: (user: User) => void;
    errorCallback: (error: any) => void;
}


export const CallbackComponent: FC<Props> = ({userManager, errorCallback, successCallback, children}) => {


    const onRedirectSuccess = useCallback((user: User) => {
        successCallback(user);
    },[successCallback]);

    const onRedirectError = useCallback((error: any) => {
        if (errorCallback) {
            errorCallback(error);
        } else {
            throw new Error(`Error handling redirect callback: ${error.message}`);
        }
    }, [errorCallback]);

    useEffect(()=>{
        userManager.signinRedirectCallback()
            .then((user) => onRedirectSuccess(user))
            .catch((error) => onRedirectError(error));
    },[userManager, onRedirectError, onRedirectSuccess])

    return (<>{children}</>)

}
