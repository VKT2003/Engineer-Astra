import React, { useContext } from 'react';
import styles from '../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faVideo, faHeadset, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from '../context/MenuContext';

const SideBar = () => {

  const { openHam, toggleMenu } = useContext(MenuContext);

  return (
    <div className={`${styles.sidebar} ${openHam ? styles.closeSidebar : styles.openSidebar}`}>
      <img className={styles.logo} src="\logo.png" alt="profile" />
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
      </ul>
    </div>
  );
}

export default SideBar;
