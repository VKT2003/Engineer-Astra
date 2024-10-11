import React, { useState, useEffect } from 'react';
import styles from '../../styles/LecturePlaylistView.module.css';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import Playlistdata from '../Lectures/CSEPlalistData/data.json';
import Playlist from '../Lectures/LecturePlaylist.json';

const LecturePlaylistView = () => {
  const { category, playlist, playlistId, videoId } = useParams();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const [selectedPlaylistData, setSelectedPlaylistData] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0);

  console.log(category, playlist, playlistId, videoId);

  useEffect(() => {
    if (playlistId) {
      const filteredPlaylists = Playlistdata.playlists.filter(pl => pl.playlistId === playlistId);
      setSelectedPlaylists(filteredPlaylists[0].videos);
      setSelectedPlaylist(filteredPlaylists[0]);
    }
  }, [playlistId, category]);

  useEffect(() => {
    const playlistCategoryName = playlist.split(' ')[0].toLowerCase();
    const playlistCategory = Playlist.playlists[playlistCategoryName];

    const filteredPlaylistData = playlistCategory?.filter(pl => pl.playlistId === playlistId);

    if (playlistCategory) {
      setSelectedPlaylistData(filteredPlaylistData[0]);
    } else {
      setSelectedPlaylistData([]);
    }
  }, [playlist, playlistId]);

  const extractVideoId = (url) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (videoId) {
      const index = selectedPlaylists.findIndex(playlists => extractVideoId(playlists.url) === videoId);
      setVideoIndex(index + 1);
    }
  }, [videoId, selectedPlaylists]);

  console.log(videoIndex)

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.cardsContainer}>
          <div className={`${styles.youtube}`} >
            <div className={`${styles.imgContainer}`}>
              <img src={selectedPlaylistData.imgUrl} alt={selectedPlaylistData.name} />
            </div>
            <div className={`${styles.card_container}`}>
              <div className={`${styles.imgSection}`}>
                <div className={`${styles.card}`}>
                  <img src={selectedPlaylistData.imgUrl} alt='' />
                  <Link to={`/lectures/${category}/${playlist}/${selectedPlaylistData.playlistId}/${selectedPlaylistData.firstVideoId}`} className={`${styles.hovered}`}>
                    <i class="fa-solid fa-play"></i>
                    <li>Play All</li>
                  </Link>
                </div>
              </div>
              <div className={`${styles.cardContentSection}`}>
                <h3>{selectedPlaylistData?.name}</h3>
                <p className={`${styles.count}`}>{selectedPlaylistData?.videoCount} videos</p>
                <Link to={`/lectures/${category}/${playlist}/${selectedPlaylistData.playlistId}/${selectedPlaylistData.firstVideoId}`}><i class="fa-solid fa-play"></i> Play All</Link>
                <p>{selectedPlaylistData?.description}</p>
              </div>
            </div>
          </div>
          <div className={`${styles.playlist}`}>
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
                      <h4>{playlists.title.slice(0, 100)}{playlists.title.length > 100 && '...'}</h4>
                      <Link to={`/lectures/${category}/${playlist}/${playlistId}/${extractVideoId(playlists.url)}`} className={`${styles.cardLink}`}>
                        View Playlist
                      </Link>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No courses available for this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturePlaylistView;
