import { useAPI } from './useAPI';
import { useData } from './useData';


export default function useCredentials () {
    const { credentials } = useData();
    const { setCredentials } = useAPI();

    return { credentials, setCredentials };
};