import withRouter, {ReactOidcHistory} from "../routes/withRouter";
import {User, UserManager} from "oidc-client";
import {ComponentType, FC} from "react";
import { oidcLog } from "../service/loggerService";
import {getUserManager} from "../service/authenticationService";
import {CallbackComponent} from "../callback/CallbackComponent";
import {connect} from "react-redux";
import {compose, pure, withProps} from "recompose";



export const success = (oidcLogInjected: { error: (msg: string) => void }) => (
    history: ReactOidcHistory
) => (user: User | null) => {
    if (user && user.state) {
        history.push(user.state.url);
    } else {
        oidcLogInjected.error('urlBeforeSignin is null or undefined');
    }
};


interface AuthenticationCallbackProps  {
    history: ReactOidcHistory;
    userManager: UserManager;
    callbackComponentOverride?: ComponentType;
};


const AuthenticationCallback: FC<AuthenticationCallbackProps> = (
    {
     history,
     userManager= getUserManager(),
     callbackComponentOverride: CallbackComponentOverride = null,
    }) => {
    const successCallback = (user: User | null) => success(oidcLog)(history)(user);

    const errorCallback = (error: Error) => {
        const { message } = error;
        oidcLog.error(`There was an error handling the token callback: ${message}`);
        history.push(`/authentication/not-authenticated?message=${message}`);
    };

    return (
        <CallbackComponent
            userManager={userManager}
            errorCallback={errorCallback}
            successCallback={successCallback}
        >
            {CallbackComponentOverride ? (
                <CallbackComponentOverride />
            ) : (
                <p>Authentification en cours vous allez être redirigé.</p>
            )}
        </CallbackComponent>
    );
};

export default withRouter(AuthenticationCallback) ;
