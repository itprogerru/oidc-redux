import React, { FC, useEffect } from 'react';
import { UserManager } from 'oidc-client';
import {oidcLog} from "../service/loggerService";


interface SilentCallbackProps {
    logger?: typeof oidcLog;
}

export const SilentCallback: FC<SilentCallbackProps> = ({ logger= oidcLog }) => {
    useEffect(() => {
        new UserManager({}).signinSilentCallback();
        logger.info('callback silent signin successfull');
    });

    return <div />;
};
