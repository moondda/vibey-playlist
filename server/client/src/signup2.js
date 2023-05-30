import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function SignUp2() {

    const [data, setData] = useState([]);
    const [selectedAudio, setSelectedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://itunes.apple.com/search?limit=5&term=아이브&media=music');
            setData(response.data.results);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

      const handleImageClick = (audioUrl) => {
        setSelectedAudio(audioUrl);
        setIsPlaying(true);
      };

      return (
        <div>
          {data.map((item) => (
            <div key={item.trackId}>
              <img src={item.artworkUrl100} alt={item.trackName} onClick={() => handleImageClick(item.previewUrl
                )} />
              <p>{item.trackName}</p>
            </div>
          ))}
          <audio src={selectedAudio} autoPlay={isPlaying} />
        </div>
      );
    };