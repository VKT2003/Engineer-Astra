import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyCkQaNvo5XmUZ-XxVTY5OMMjUNLMjl2DI0';
const FOLDER_ID = '1Dcc83AznPkbNXrPws__2-hUGXv2iKnNb';

const GoogleDriveFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Function to load files from Google Drive
    const loadDriveFiles = () => {
      const folderQuery = `'${FOLDER_ID}' in parents`;
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
  }, []);

  return (
    <div>
      <h1>Google Drive Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleDriveFiles;
