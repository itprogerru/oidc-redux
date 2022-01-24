import {UserManager, UserManagerSettings} from 'oidc-client';

export const createUserManager = (config: UserManagerSettings) => {
    return new UserManager(config);
}
