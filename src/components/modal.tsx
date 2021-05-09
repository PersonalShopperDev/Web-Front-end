import { useRef, Dispatch, SetStateAction } from 'react';
import styles from 'sass/modal.module.scss';

export default function Modal ({showModal, setShowModal} : {showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>}) {
    const modalTitle: string = "Modal Test........";
    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    }
    return (
        <>
            {showModal ? 
            <div className={styles.modalBackground} ref={modalRef} onClick={closeModal}>
                <div className={styles.modalContainer}>
                    <span>{modalTitle}</span>
                    <button onClick={() => setShowModal(false)}>취소</button>
                </div>
            </div> 
            : null }
        </>
    )
}