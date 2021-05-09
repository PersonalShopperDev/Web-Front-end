import { useState } from 'react';
import Layout from "src/layouts/default";
import Navigation from 'src/components/navigation';
import Modal from 'src/components/modal';
import styles from 'sass/modal.module.scss';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout
      Header={
        <Navigation />
      }
      children={
        <div className={styles.background}>
          <button onClick={() => setShowModal(!showModal)}>
            Click here
          </button>
          <Modal showModal={showModal} setShowModal={setShowModal}/>
        </div>
      }
    />
  )
}
