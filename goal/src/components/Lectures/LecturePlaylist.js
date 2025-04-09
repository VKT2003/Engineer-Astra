import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/LecturePlaylist.module.css';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import Playlist from '../Lectures/LecturePlaylist.json';
import { AuthContext } from '../../context/AuthProvider';
import DownloadCertificateButton from '../DownloadCertificateButton';

const LecturePlaylist = () => {
  const { category, playlist } = useParams();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const { user, isLogged, loading, courses } = useContext(AuthContext);

  useEffect(() => {
    const playlistCategoryName = playlist.split(' ')[0].toLowerCase();
    const playlistCategory = Playlist.playlists[playlistCategoryName];

    if (playlistCategory) {
      setSelectedPlaylists(playlistCategory);
    } else {
      setSelectedPlaylists([]);
    }
  }, [playlist]);

  const handleDownload = (userId, playlistId) => {

    const certUrl = `${process.env.REACT_APP_CERTIFICATE_URL}/?userId=${userId}&playListId=${playlistId}`;

    window.open(certUrl, "_blank"); // opens in new tab
  };

  const getRequiredCourseData = (playlistId) => {
    return courses?.find((course) => course.playListId === playlistId) || null;
  };

  console.log(courses)

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <h2>{playlist} Courses</h2>
        <div className={styles.cardsContainer}>
          {selectedPlaylists.length > 0 ? (
            selectedPlaylists.map((playlists, index) => {
              const courseData = getRequiredCourseData(playlists.playlistId);
              const completedVideos = courseData?.completedVideos?.length || 0;
              const totalVideos = courseData?.totalVideos || 1;

              console.log(courseData)
              const progressValue = totalVideos > 0 ? completedVideos / totalVideos : 0;

              return (
                <div key={index} className={styles.card}>
                  <div className={`${styles.cardImage}`}>
                    <img src={playlists.imgUrl} alt={playlists.name} />
                    <p><i className="fa-solid fa-list"></i> {playlists.videoCount} Videos</p>
                    <Link to={`/lectures/${category}/${playlist}/${playlists.playlistId}/${playlists.firstVideoId}`} className={`${styles.hovered}`}>
                      <i className="fa-solid fa-play"></i>
                      <li>Play All</li>
                    </Link>
                  </div>
                  <div className={`${styles.cardContent}`}>
                    <h3>{playlists.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                      <Link to={`/lectures/${category}/${playlist}/${playlists.playlistId}`} className={`${styles.cardLink}`}>
                        View Playlist
                      </Link>
                      {courseData?.isCompleted && (
                        <DownloadCertificateButton
                          handleDownload={() =>
                            handleDownload(user.id, playlists.playlistId)
                          }
                        />
                      )}
                    </div>
                    {isLogged && (
                      <>
                        <div className={`${styles.progress}`}>
                          <progress value={progressValue} max="1"></progress>
                          <span>{Math.round(progressValue * 100)}% Completed</span>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              );
            })
          ) : (
            <p>No courses available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturePlaylist;
