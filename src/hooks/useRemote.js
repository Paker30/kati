import { useEffect } from 'react';
import useCredentials from 'hooks/useCredentials';
import { drive, sync } from 'services/dbCloud';

export default function useRemote() {
    const { credentials } = useCredentials();

    useEffect(() => {
        console.log(`credentials ${JSON.stringify(credentials)}`);
        if (credentials.access_token) {
            const googleCloud = drive.google({
                getAccessToken: () => Promise.resolve(credentials.access_token),
            });

            sync.use(googleCloud);
            sync.init();
        }
    }, [credentials]);

    return { sync, drive, credentials };
};