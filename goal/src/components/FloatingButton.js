import React from 'react'
import styles from '../styles/FloatingButton.module.css'

const FloatingButton = ({handleDownload}) => {
    return (
        <button className={`${styles.floating_certificate_btn}`} onClick={handleDownload}>
            🎓 Download Certificate
        </button>
    )
}

export default FloatingButton