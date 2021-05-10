import { useRef, Dispatch, SetStateAction, useEffect } from 'react';
import styles from 'sass/modal.module.scss';

export default function Modal ({
    showModal, 
    setShowModal, 
    title, 
    content
} : {
    showModal: boolean, 
    setShowModal: Dispatch<SetStateAction<boolean>>, 
    title: string, 
    content: string
}) {
    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    }
    useEffect(() => {
        if(showModal){
            document.body.style.position = "fixed";
        }else{
            document.body.style.position = "relative";
        }
    }, [showModal]);
    return (
        <>
            {showModal ? 
            <div className={styles.modalBackground} ref={modalRef} onClick={closeModal}>
                <div className={styles.modalContainer}>
                    <span>{title}</span>
                    <span>{content}</span>
                    <button onClick={() => setShowModal(false)}>취소</button>
                </div>
            </div> 
            : null }
        </>
    )
}