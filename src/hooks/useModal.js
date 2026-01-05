import { useAPI } from './useAPI';
import { useData } from './useData';

export const useModal = () => {
    const { openModal, closeModal } = useAPI();
    const { showModal } = useData();

    return { showModal, openModal, closeModal };
};