export interface ConfigurationPropTypes {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope?: string;
    authority: string;
    silent_redirect_uri?: string;
    automaticSilentRenew?: boolean;
    loadUserInfo?: boolean;
    triggerAuthFlow?: boolean;
    storeJwtInMemory?: boolean;
    metadata?: Metadata;
}

export interface Metadata {
    issuer: string;
    jwks_uri: string;
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    end_session_endpoint: string;
    revocation_endpoint: string;
    introspection_endpoint: string;
}
