import { useContext } from 'react';
import ModalContext from '../context/modal';

export default function useModal () {
    const { showModal, setModal } = useContext(ModalContext);

    return { showModal, setModal };
};