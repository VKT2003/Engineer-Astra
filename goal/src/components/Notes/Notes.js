import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import styles from '../../styles/NotesFolder.module.css';

// Icons for different file types
import pdfIcon from '../../assets/pdf.png';    // Update with the path to your PDF icon
import pptIcon from '../../assets/ppt.png';    // Update with the path to your PPT icon
import excelIcon from '../../assets/xls.png'; // Update with the path to your Excel icon
import fileIcon from '../../assets/file.png';
import photoIcon from '../../assets/photo.png';
import docIcon from '../../assets/doc.png';

const API_KEY = 'AIzaSyCkQaNvo5XmUZ-XxVTY5OMMjUNLMjl2DI0';

const Notes = () => {
  const [files, setFiles] = useState([]);

  const { folderId, notesFolderId } = useParams();

  useEffect(() => {
    // Function to load files from Google Drive
    const loadDriveFiles = () => {
      const folderQuery = `'${notesFolderId}' in parents`;
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(folderQuery)}&key=${API_KEY}&fields=files(id,name,webViewLink)`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.files) {
            setFiles(data.files);
          } else {
            console.error('No files found in the folder.');
          }
        })
        .catch((error) => {
          console.error('Error fetching files:', error);
        });
    };

    loadDriveFiles();
  }, [notesFolderId]);

  // Function to get the appropriate icon based on file extension
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return pdfIcon;
      case 'ppt':
      case 'pptx':
        return pptIcon;
      case 'xls':
      case 'xlsx':
        return excelIcon;
      case 'jpg' || 'jpeg' || 'png' || 'gif':
        return photoIcon;
      case 'docx':
        return docIcon;
      case 'doc':
        return docIcon;
      default:
        return fileIcon; // Generic file icon for other types
    }
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <h2>Categories..</h2>
        <div className={styles.cardsContainer}>
          {files.map((file) => (
            <div key={file.id} className={`${styles.folder}`}>
              <Link to={file.webViewLink} target='_blank' rel="noopener noreferrer">
                <img 
                  src={getFileIcon(file.name)} 
                  style={{ opacity: '0.8' }} 
                  alt="file icon" 
                />
                <p>{file.name.slice(0, 16)}{file.name.length > 15 && '...'}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
