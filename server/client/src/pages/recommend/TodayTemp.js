import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Loader from "react-loader-spinner";
import loadingSpinner from "../../assets/loading-spinner.gif";

export default function TodayMusic() {
  const [loading, setLoading] = useState(true);
  const [todayMusic, setTodayMusic] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await axios.get("http://localhost:5000/today-music/random");
        const { trackName, artistName, artwork, previewUrl } = res.data;

        setTodayMusic({
          singer: artistName,
          title: trackName,
          musicImg: artwork,
          musicPlay: previewUrl,
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner src={loadingSpinner} alt="Loading" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>오늘의 추천 음악을 불러올 수 없습니다.</ErrorMessage>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <TodayText>오늘의 추천</TodayText>

      <div className="today_music">
        <AlbumImg>
          <img
            src={todayMusic.musicImg}
            style={{ width: "250px" }}
            alt="Album"
          />
        </AlbumImg>

        <DescripBox>
          <MusicTitle>{todayMusic.title}</MusicTitle>
          <div>{todayMusic.singer}</div>
        </DescripBox>
      </div>
      {/* <div style={{ border: "1px solid pink" }}>노래 재생바?</div> */}
      {/* 아래에는 하단바 컴포넌트 넣기 */}
    </div>
  );
}

const TodayText = styled.div`
  font-style: bold;
  font-weight: 600;
  font-size: 30px;
  color: #ffffff;
`;

const AlbumImg = styled.div`
  height: 250px;
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = styled.img`
  width: 100px;
  height: 100px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;
