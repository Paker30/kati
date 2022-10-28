import { useEffect, useState } from 'react';
import useCredentials from 'hooks/useCredentials';
import { drive, sync } from 'services/dbCloud';

export default function useRemote() {
    const { credentials } = useCredentials();

    useEffect(() => {
        console.log(`credentials ${JSON.stringify(credentials)}`);
        if (credentials.accessToken) {
            const googleCloud = drive.google({
                getAccessToken: () => Promise.resolve(credentials.accessToken),
            });

            sync.use(googleCloud);
            sync.init();
        }
    }, [credentials]);

    return { sync, drive, credentials };
};