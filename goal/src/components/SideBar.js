import React, { useContext } from 'react';
import styles from '../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faVideo, faHeadset, faUniversity, faUser, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from '../context/AuthProvider';

const SideBar = () => {

  const { openHam } = useContext(MenuContext);

  const { isLogged } = useContext(AuthContext);

  return (
    <div className={`${styles.sidebar} ${openHam ? styles.closeSidebar : styles.openSidebar}`}>
      <Link to={"/"}><img className={styles.logo} src="\logo.png" alt="profile" loading='lazy' /></Link>
      <div className={`${styles.services}`}>
        <div className={`${styles.sep}`}></div>
        <h1>Services</h1>
        <div className={`${styles.sep}`}></div>
      </div>
      <ul>
        <li>
          <Link to="/notes/1OH4z6vO0fGyaJvPm_IkJ6qNnwYQgAP8H">
            <FontAwesomeIcon icon={faBook} /> Subject Notes
          </Link>
        </li>
        <li><Link to="/collegelist"><FontAwesomeIcon icon={faUniversity} /> Search Colleges</Link></li>
        <li>
          <Link to="/lectures">
            <FontAwesomeIcon icon={faVideo} /> Lectures
          </Link>
        </li>
        <li>
          <Link to="/helpdesk">
            <FontAwesomeIcon icon={faHeadset} /> Student HelpDesk
          </Link>
        </li>
        <li>
          <Link to="/topcolleges">
            <FontAwesomeIcon icon={faUniversity} /> Top Colleges
          </Link>
        </li>
        <li>
          <Link to="/verify">
            <FontAwesomeIcon icon={faCertificate} /> Verify Certificate
          </Link>
        </li>
        {isLogged && (<li>
        <Link to="/profile">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
        </li>)}
      </ul>
    </div>
  );
};

export default SideBar;
