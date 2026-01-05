import { useAPI } from './useAPI';
import { useData } from './useData';


export const useCredentials = () => {
    const { credentials } = useData();
    const { setCredentials } = useAPI();

    return { credentials, setCredentials };
};