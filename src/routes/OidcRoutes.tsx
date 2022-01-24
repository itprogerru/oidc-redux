import React, {ComponentType, FC, PropsWithChildren, useEffect, useState} from "react";
import {UserManagerSettings} from "oidc-client";
import { NotAuthenticated } from "../DefaultComponents/NotAuthenticated";
import {SessionLost} from "../DefaultComponents/SessionLost";
import {getPath} from "./route-utils";
import NotAuthorized from "../DefaultComponents/NotAuthorized";
import {SilentCallback} from "../callback/SilentCallback";

interface OidcRoutesProps {
    notAuthenticated?: ComponentType | null;
    notAuthorized?: ComponentType | null;
    callbackComponent: ComponentType;
    sessionLost?: ComponentType | null;
    configuration: UserManagerSettings;
}


export const OidcRoutes: FC<PropsWithChildren<OidcRoutesProps>> = (
    {
        notAuthenticated,
notAuthorized,
callbackComponent: CallbackComponent,
sessionLost,
configuration,
children,
                                                            }) => {
    const [path, setPath] = useState(window.location.pathname);


    const setNewPath = () => setPath(window.location.pathname);
    useEffect(() => {
        setNewPath();
        window.addEventListener('popstate', setNewPath, false);
        return () => window.removeEventListener('popstate', setNewPath, false);
    },[]);

    const NotAuthenticatedComponent = notAuthenticated || NotAuthenticated;
    const NotAuthorizedComponent = notAuthorized || NotAuthorized;
    const SessionLostComponent = sessionLost || SessionLost;
    const silentCallbackPath = getPath(configuration.silent_redirect_uri || '');
    const callbackPath = getPath(configuration.redirect_uri || '') || '/';

    console.log(path, callbackPath);
    switch (path) {
        case callbackPath:
            return <CallbackComponent />;
        case silentCallbackPath:
            return <SilentCallback />;
        case '/authentication/not-authenticated':
            return <NotAuthenticatedComponent />;
        case '/authentication/not-authorized':
            return <NotAuthorizedComponent />;
        case '/authentication/session-lost':
            return <SessionLostComponent />;
        default:
            return <>{children}</>;
    }
};
