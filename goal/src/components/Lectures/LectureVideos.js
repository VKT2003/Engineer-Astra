import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/LectureVideos.module.css';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import Playlistdata from '../Lectures/CSEPlalistData/data.json';
import YouTube from 'react-youtube';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import FloatingButton from '../FloatingButton';

const LectureVideos = () => {
  const { category, playlist, playlistId, videoId } = useParams();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [completedVideos, setCompletedvideos] = useState([]);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const { user, courses } = useContext(AuthContext);

  const userId = user?._id; 
  const playlistIdFromContext = playlistId; 

  const handleDownload = () => {

    const certUrl = `${process.env.REACT_APP_CERTIFICATE_URL}/?userId=${userId}&playListId=${playlistIdFromContext}`;

    window.open(certUrl, "_blank"); // opens in new tab
  };


  useEffect(() => {
    const getCompletedCourse = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courses/getCompletedCourse`, {
          userId: user?._id,
          playListId: playlistId,
        });
        setCompletedvideos(response.data.completedVideos);
      } catch (error) {
        console.log(error);
      }
    }
    const getRequiredCourseData = (playlistId) => {
      console.log(courses, playlistId)
      return courses?.find((course) => course.playListId === playlistId) || null;
    };

    getCompletedCourse();
    if (courses) {
      const courseData = getRequiredCourseData(playlistId);
      if (courseData?.isCompleted) {
        setIsCourseCompleted(true)
      }
    }

    }, [playlistId, user, courses]);

  useEffect(() => {
    // Get the selected playlist from the JSON data
    if (playlistId) {
      const filteredPlaylists = Playlistdata.playlists.filter(pl => pl.playlistId === playlistId);
      console.log(filteredPlaylists[0].videos);
      setSelectedPlaylists(filteredPlaylists[0].videos);
      setSelectedPlaylist(filteredPlaylists[0]);
    }
  }, [playlistId]);

  const onPlayerReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  // const opts = {
  //   height: '390',
  //   width: '640',
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };

  // Function to extract YouTube video ID from the video URL
  const extractVideoId = (url) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null; // Return video ID or null if not found
  };

  const handleComplete = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courses/create`, {
        userId: user?._id,
        playListId: playlistId,
        videoUrl: videoId,
        totalVideos: selectedPlaylist.videos.length,
        playListName: selectedPlaylist.name,
        category: category,
        playlist: playlist,
      });

      console.log(response)

      if (response.data.isCompleted) {
        alert("You have completed this course")
        window.location.reload();
      }
      setCompletedvideos((prev) => [...prev, videoId]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (videoId) {
      const index = selectedPlaylists.findIndex(playlists => extractVideoId(playlists.url) === videoId);
      setVideoIndex(index + 1);
    }
  }, [videoId, selectedPlaylists]);

  console.log("completedVideos", completedVideos);



  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.cardsContainer}>
          <YouTube videoId={videoId} onReady={onPlayerReady} onEnd={handleComplete} className={`${styles.youtube}`} />
          <div className={`${styles.playlist}`}>
            <div className={`${styles.header}`}>
              <h3>{selectedPlaylist?.name}</h3>
              <p>{selectedPlaylist.name?.match(/\(([^)]+)\)/)?.[1]} - {videoIndex} / {selectedPlaylist.videos?.length}</p>
            </div>
            <div className={`${styles.playlistVideos}`}>
              {selectedPlaylists.length > 0 ? (
                selectedPlaylists.map((playlists, index) => (
                  <Link to={`/lectures/${category}/${playlist}/${playlistId}/${extractVideoId(playlists.url)}`} key={index} className={`${styles.playlistVideosList} ${videoId === extractVideoId(playlists.url) && styles.activeLink}`}>
                    <div className={`${styles.index}`}>
                      {(videoId === extractVideoId(playlists.url) ? <i class="fa-solid fa-play"></i> : <p>{index + 1}</p>
                      )}
                    </div>
                    <div className={`${styles.cardImage}`}>
                      {/* Extract the video ID and use it for the YouTube thumbnail image */}
                      <img
                        src={`https://i.ytimg.com/vi/${extractVideoId(playlists.url)}/hqdefault.jpg`}
                        alt={playlists.name}
                      />
                    </div>
                    <div className={`${styles.cardContent}`}>
                      <h4>{playlists.title.slice(0, 70)}{playlists.title.length > 70 && '...'}</h4>
                      <Link to={`/lectures/${category}/${playlist}/${playlistId}/${extractVideoId(playlists.url)}`} className={`${styles.cardLink}`}>
                        View Playlist
                      </Link>
                    </div>
                    <div className={`${completedVideos.includes(extractVideoId(playlists.url)) ? styles.completed : styles.notCompleted}`}>
                      <div></div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No courses available for this category.</p>
              )}
            </div>
          </div>
          {isCourseCompleted && (
            <FloatingButton handleDownload={handleDownload} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureVideos;
