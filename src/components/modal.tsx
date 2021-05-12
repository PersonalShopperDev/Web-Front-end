import {
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import styles from 'sass/modal.module.scss'

export default function Modal({
  showModal,
  setShowModal,
  title,
  content,
} : {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    title: string,
    content: string
}) {
  const modalRef = useRef()

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }
  const [fixedHeight, setFixedHeight] = useState(0)

  useEffect(() => {
    if (showModal) {
      setFixedHeight(document.documentElement.scrollTop)
      document.body.style.top = `${-1 * document.documentElement.scrollTop}px`
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'relative'
      document.body.style.top = '0'
      window.scrollTo({ top: fixedHeight })
    }
  }, [showModal])

  return (
    <>
      { showModal
        ? (
          <div className={styles.modalBackground} ref={modalRef} onClick={closeModal} id="modal" aria-hidden="true">
            <div className={styles.modalContainer}>
              <span>{title}</span>
              <span>{content}</span>
              <button type="button" onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        )
        : null }
    </>
  )
}
