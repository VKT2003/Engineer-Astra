import React from 'react'
import styles from '../styles/Mtech.module.css'
import Navbar from './Navbar'

const Mtech = () => {
  return (
   <div className={styles.main}>
    <Navbar />
    <div className={styles.content}>
    <div className={styles.contentChild}>
      <iframe
        src="https://legacy.reactjs.org/tutorial/tutorial.html#setup-option-1-write-code-in-the-browser"
        className={styles.Frame}
        title="example-iframe"
      ></iframe>
    </div>
    </div>

   </div>
  )
}

export default Mtech