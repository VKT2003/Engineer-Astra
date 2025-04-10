import React from 'react'
import styles from '../styles/FloatingButton.module.css'

const CustomButton = ({text, onClick}) => {
    return (
        <button style={{marginTop:"20px"}} className={`${styles.download_certificate_btn}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default CustomButton