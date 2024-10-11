import React, { useState, useEffect } from 'react';

const YouTubeVideo = () => {
    const [videoData, setVideoData] = useState(null);
    const API_KEY = 'AIzaSyBxyXlyBFS9ABQlDNY4I3cbrFJxwtRk2-4'; // Replace with your YouTube Data API key
    const videoId = 'VrQLeTkaRx8'

    useEffect(() => {
        const fetchVideoData = async () => {
            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${videoId}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    const videoInfo = data.items[0].snippet; // Extract snippet
                    setVideoData({
                        title: videoInfo.title,
                        thumbnail: videoInfo.thumbnails.high.url // You can choose different quality (default, medium, high)
                    });
                } else {
                    console.error('No video data found');
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    return (
        <div>
            {videoData ? (
                <div>
                    <h2>{videoData.title}</h2>
                    <img src={videoData.thumbnail} alt={videoData.title} />
                </div>
            ) : (
                <p>Loading video data...</p>
            )}
        </div>
    );
};

export default YouTubeVideo;
