import {createUserManager} from "./createUserManager";
import {UserManagerSettings} from "oidc-client";

export const processSilentRenew = (config: UserManagerSettings) => {
    const mgr = createUserManager(config);
    mgr.signinSilentCallback();
}
