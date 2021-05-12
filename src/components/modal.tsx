import { useRef, Dispatch, SetStateAction, useEffect, useState } from 'react';
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

    const [fixedHeight, setFixedHeight] = useState(0)

    useEffect(() => {
        if(showModal){
            setFixedHeight(document.documentElement.scrollTop);
            document.body.style.top = `${-1*document.documentElement.scrollTop}px`;
            document.body.style.position = "fixed";
        }else{
            document.body.style.position = "relative";
            document.body.style.top = '0';
            window.scrollTo({top:fixedHeight})
        }
    }, [showModal]);

    const scrollEventListner = () => {
        console.log('scrollY: ' + window.scrollY);
        console.log('scrollTop: ' + document.documentElement.scrollTop)
    };

    useEffect(() => {
      document.addEventListener('scroll', scrollEventListner);
      return  () => document.removeEventListener('scroll', scrollEventListner);
    }, []);

    return (
        <>
            {showModal ? 
            <div className={styles.modalBackground} ref={modalRef} onClick={closeModal} id="modal">
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