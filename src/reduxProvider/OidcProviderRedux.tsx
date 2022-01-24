import {ComponentType, FC} from "react";
import {authenticationService, UserStoreType} from "../service/authenticationService";
import {Store} from "@reduxjs/toolkit";
import {ConfigurationPropTypes} from "../interface/ConfigurationPropTypes";
import {OidcProvider} from "../Provider/OidcProvider";
import {OidcRoutes} from "../routes/OidcRoutes";
import AuthenticationCallback from "./AuthenticationCallback";


interface PropsTypes {
    notAuthenticated?: ComponentType | null;
    notAuthorized?: ComponentType | null;
    callbackComponentOverride?: ComponentType | null;
    sessionLostComponent?: ComponentType | null;
    configuration: ConfigurationPropTypes;
    store: Store;
    UserStore: UserStoreType;
    authenticationServiceInternal: typeof authenticationService

}

const withComponentOverrideProps = (Component: ComponentType, customProps: any) => (props: any) => (
    <Component callbackComponentOverride={customProps} {...props} />
);

const OidcBaseInternal: FC<PropsTypes> = (props) => {
    const {
        children,
        store,
        callbackComponentOverride,
        configuration,
        notAuthenticated,
        notAuthorized,
        sessionLostComponent,
        UserStore,
        authenticationServiceInternal,
    } = props;

    const getUserManager = () => authenticationServiceInternal(configuration, UserStore);
    return (
        <OidcProvider store={store} userManager={getUserManager()}>
            <OidcRoutes
                configuration={configuration}
                notAuthenticated={notAuthenticated}
                notAuthorized={notAuthorized}
                sessionLost={sessionLostComponent}
                callbackComponent={withComponentOverrideProps(AuthenticationCallback, callbackComponentOverride)}
            >
                {children}
            </OidcRoutes>
        </OidcProvider>
    );
};

export const OidcProviderRedux: FC<Omit<PropsTypes, 'authenticationServiceInternal'>> = (props) => <OidcBaseInternal authenticationServiceInternal={authenticationService} {...props} />;
