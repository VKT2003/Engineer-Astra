import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import styles from '../../styles/NotesFolder.module.css';
import { Link, useParams } from 'react-router-dom';

const NotesFolder = () => {
    const API_KEY = 'AIzaSyCkQaNvo5XmUZ-XxVTY5OMMjUNLMjl2DI0';
    const {folderId} = useParams();
    const [folders, setFolders] = useState([]);
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Function to load folders from Google Drive
        const loadDriveFolders = () => {
            const folderQuery = `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`;
            const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(folderQuery)}&key=${API_KEY}&fields=files(id,name,webViewLink)`;

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data from Google Drive API');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.files && data.files.length > 0) {
                        setFolders(data.files);
                    } else {
                        console.error('No folders found in the parent folder.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching folders:', error);
                    setError(error.message);
                });
        };

        loadDriveFolders();
    }, [folderId]);

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <h2>Notes..</h2>
                <div className={styles.cardsContainer}>
                    {folders.map((folder) => (
                        <div key={folder.id} className={`${styles.folder}`}>
                            <Link to={`/notes/${folderId}/${folder.id}`} rel="noopener noreferrer">
                                <img src="/folder.png" alt="folder" />
                                <p>{folder.name.slice(0,16)}{folder.name.length > 15 && '...'}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesFolder;
