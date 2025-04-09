import React from 'react'
import styles from '../styles/FloatingButton.module.css'

const DownloadCertificateButton = ({handleDownload}) => {
    return (
        <button className={`${styles.download_certificate_btn}`} onClick={handleDownload}>
            🎓 Download Certificate
        </button>
    )
}

export default DownloadCertificateButton