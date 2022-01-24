import {ComponentType, FC, PropsWithChildren, useEffect} from "react";
import withRouter, {ReactOidcHistory} from "../routes/withRouter";
import {UserState} from "../Reducer/Reducer";
import {authenticateUser, isRequireAuthentication} from "../service/oidcServices";
import { getUserManager } from "../service/authenticationService";
import {Authenticating as DefaultAuthenticatingComponent} from '../DefaultComponents/Authenticating'
import {compose} from "recompose";
import {connect, useSelector} from "react-redux";

type AuthenticationLiveCycleProps = PropsWithChildren<{
    location: Location;
    history: ReactOidcHistory;
    oidc: UserState;
    authenticating: ComponentType;
}>;

const AuthenticationLiveCycle: FC<AuthenticationLiveCycleProps> = ({ location, oidc, children, history, authenticating }) => {
    //const { user } = oidc;
    const { user } = useSelector((state: any) => state.oidc )

    const userRequireAuthentication = isRequireAuthentication(user);

    useEffect(() => {
        if (userRequireAuthentication) {
            const userManager = getUserManager();
            authenticateUser(userManager, location, history, user)();
        }
    }, [userRequireAuthentication, location, user, history]);

    const AuthenticatingComponent: ComponentType = authenticating || DefaultAuthenticatingComponent;

    return userRequireAuthentication ? <AuthenticatingComponent /> : <>{children}</>;
};

const mapStateToProps = (state: any) => ({
    oidc: state.oidc,
});

const oidcCompose = compose(connect(mapStateToProps, null), withRouter);

// @ts-ignore
const Secure = oidcCompose(AuthenticationLiveCycle);

export const oidcSecure = (Component: ComponentType) => (props: any) => {
    return (
        <Secure>
            <Component {...props} />
        </Secure>
    );
};

type OidcSecureProps = PropsWithChildren<{
    /**
     * Enable secure authentication for component
     */
    isEnabled?: boolean;
    /**
     * Custom Authenticating Component
     */
    authenticating?: ComponentType;
}>;

const defaultPropsOidcSecure = {
    isEnabled: true,
};

const OidcSecure: FC<OidcSecureProps> = props => {
    const { isEnabled, children, ...configProps } = props;

    if (isEnabled) {
        return <Secure {...configProps}>{children}</Secure>;
    }
    return <>{children}</>;
};

OidcSecure.defaultProps = defaultPropsOidcSecure;

export default OidcSecure;
