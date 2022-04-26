import { useEffect, useState } from 'react';
import useCredentials from 'hooks/useCredentials';
import { drive, sync } from 'services/dbCloud';

export default function useRemote() {
    const { credentials } = useCredentials();

    useEffect(() => {
        if (credentials.accessToken) {
            const googleCloud = drive.google({
                getAccessToken: () => credentials.accessToken,
            });

            sync.use(googleCloud);
            sync.init();
        }
    }, [credentials]);

    return { sync, credentials };
};