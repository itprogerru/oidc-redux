import {
    UserManager,
    WebStorageStateStore,
    InMemoryWebStorage,
    UserManagerSettings, WebStorageStateStoreSettings,
} from 'oidc-client';

let userManager: UserManager;

export const setUserManager = (userManagerToSet: UserManager) => {
    userManager = userManagerToSet;
};

export const getUserManager = () => userManager;

// typeof oidc-client.WebStorageStateStoreSettings.store
export type UserStoreType = WebStorageStateStoreSettings['store'];

export const authenticationServiceInternal = (
    WebStorageStateStoreInt: typeof WebStorageStateStore
) => (configuration: UserManagerSettings, UserStore?: UserStoreType) => {
   if (userManager) {
        return userManager;
    }
    let overriddenConfiguration = { ...configuration };

    if (UserStore) {
        overriddenConfiguration = {
            ...overriddenConfiguration,
            userStore: new WebStorageStateStoreInt({ store: new UserStore() })
        }
    }
    userManager = new UserManager(overriddenConfiguration);
    setUserManager(userManager);
    return userManager;
};

export const authenticationService = authenticationServiceInternal(WebStorageStateStore);

export { InMemoryWebStorage };
