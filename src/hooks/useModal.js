import { useAPI } from './useAPI';
import { useData } from './useData';

export default function useModal () {
    const { openModal, closeModal } = useAPI();
    const { showModal } = useData();

    return { showModal, openModal, closeModal };
};