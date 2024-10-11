import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/BottomNav.module.css'

const BottomNav = () => {
  return (
    <div className={`${styles.navbar}`}>
            <div className={`${styles.left}`}>
                <ul>
                    <li><Link to="/"><i class="fa-solid fa-house"></i> Home</Link></li>
                    <li><Link to="/about"><i class="fa-solid fa-address-card"></i> About</Link></li>
                    <li><Link to="/courses"><i class="fa-solid fa-book"></i> Courses</Link></li>
                </ul>
            </div>
        </div>
  )
}

export default BottomNav