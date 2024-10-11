import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import { MenuContext } from '../context/MenuContext'
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
    const navigate = useNavigate()
    const { user, isLogged } = useContext(AuthContext);


    const { openHam, toggleMenu } = useContext(MenuContext)

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <div className={`${styles.navbar}`}>
            <div className={`${styles.hamburger} ${openHam ? styles.openHam : styles.closeHam}`} onClick={toggleMenu}>
                <ul>
                    <li className={`${styles.line}`}></li>
                    <li className={`${styles.line}`}></li>
                    <li className={`${styles.line}`}></li>
                </ul>
            </div>
            <div className={`${styles.left}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className={`${styles.courses}`}><Link to="/courses">Courses</Link>
                        <div className={styles.dropdownContent}>
                            <Link to="/btech">B.tech</Link>
                            <Link to="/mtech">React Tutorial</Link>
                            <Link to="/mba">MBA</Link>
                        </div>
                    </li>
                    
                </ul>
            </div>
            {/* <div className={`${styles.right}`}>
                <input type="button" value="sign-in" onClick={()=>navigate('/login')} />
            </div> */}
            {isLogged ? (
                <div className={`${styles.userProfile}`}>
                        <div>{user.user.name[0].toUpperCase()}</div>
                        <input type="button" value="Log Out" onClick={logout} />
                    </div>
            ) : (
                <div className={`${styles.right}`}>
                    <input type="button" value="sign-in" onClick={()=>navigate('/login')} />
                </div>
            )}
        </div>
    )
}

export default Navbar