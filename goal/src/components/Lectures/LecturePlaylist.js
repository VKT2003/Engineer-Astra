import React, { useState, useEffect } from 'react';
import styles from '../../styles/LecturePlaylist.module.css';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import Playlist from '../Lectures/LecturePlaylist.json';

const LecturePlaylist = () => {
  const { category } = useParams();
  const { playlist } = useParams();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  useEffect(() => {
    // Get the selected category from the URL parameter
    const playlistCategoryName = playlist.split(' ')[0].toLowerCase();

    // Find the selected playlist category from the imported data based on the URL parameter
    const playlistCategory = Playlist.playlists[playlistCategoryName];

    if (playlistCategory) {
      setSelectedPlaylists(playlistCategory); // Set playlists for the selected category
    } else {
      setSelectedPlaylists([]); // Clear if no matching category found
    }
  }, [playlist]);

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <h2>{playlist} Courses</h2>
        <div className={styles.cardsContainer}>
          {selectedPlaylists.length > 0 ? (
            selectedPlaylists.map((playlists, index) => (
              <div key={index} className={styles.card}>
                <div className={`${styles.cardImage}`}>
                  <img src={playlists.imgUrl} alt={playlists.name} />
                  <p><i class="fa-solid fa-list"></i> {playlists.videoCount} Videos</p>
                  <Link to={`/lectures/${category}/${playlist}/${playlists.playlistId}/${playlists.firstVideoId}`} className={`${styles.hovered}`}>
                    <i class="fa-solid fa-play"></i>
                    <li>Play All</li>
                  </Link>
                </div>
                <div className={`${styles.cardContent}`}>
                  <h3>{playlists.name}</h3>
                  <Link to={`/lectures/${category}/${playlist}/${playlists.playlistId}`} className={`${styles.cardLink}`}>View Playlist</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturePlaylist;
