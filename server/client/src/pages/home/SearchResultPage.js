import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AddModal } from "../../components/notification/AddModal";
import FootBar from "../../components/footer/FootBar";

export default function SearchResultPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trackId = searchParams.get("trackId");
  const [trackData, setTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axios.get(
          `https://itunes.apple.com/lookup?id=${trackId}&entity=song`
        );
        setTrackData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTrackData();
  }, [trackId]);

  const handleImageClick = (audioUrl) => {
    setSelectedAudio(audioUrl);
    setIsPlaying(true);
  };


  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }}>
        {trackData && trackData.results && (
          <div className="today_music">
            <AlbumImg>
              {trackData.results[0] && (
                <img src={trackData.results[0].artworkUrl100} style={{ width: "250px" }} alt="Album cover" onClick={() => handleImageClick(trackData.results[0].previewUrl)} />
              )}
            </AlbumImg>
            {trackData.results[0] && (
              <DescripBox>
                <MusicTitle>{trackData.results[0].trackName}</MusicTitle>
                <div>{trackData.results[0].artistName}</div>
              </DescripBox>
            )}
          </div>
        )}
        <audio src={selectedAudio} autoPlay={isPlaying} />
      </div>
      <AddModal />
      <FootBar />
    </div>
  );

}

const AlbumImg = styled.div`
  height: 250px;
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 50px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const DescripBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const MusicTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Player = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 10px;
  background-color: #dddddd;
`;

const Progress = styled.div`
  width:  ${(props) => props.progress}%;
  height: 100%;
  background-color: #ff0000;
`;
