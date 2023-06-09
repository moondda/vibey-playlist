import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Profile() {
  const [myMusic, setMyMusic] = useState(null);

  const [mp4, setMp4] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);

  const [trackId, setTrackId] = useState("");

  const location = useLocation();
  const nickname = location.pathname.split("/")[2];

  const handleImageClick = (audioUrl) => {
    setSelectedAudio(audioUrl);
    setIsPlaying(true);
    console.log(sessionStorage.getItem("user_token"));
  };

  const viewMyFeed = async (nickname) => {
    if (nickname) {
      console.log(nickname);
      axios
        .get(`http://localhost:5000/song/other-post/${nickname}`, {})
        .then((res) => {
          console.log("res.data입니다:", res.data);
          setMyMusic(res.data);
          setMp4(res.data.mp4);
          setTrackId(res.data.trackId);
          console.log("myMusic:", myMusic);
          console.log("mp4:", mp4);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      axios
        .get("http://localhost:5000/song/mypost", {
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        })
        .then((res) => {
          console.log("res.data입니다:", res.data);
          setMyMusic(res.data);
          setMp4(res.data.mp4);
          setTrackId(res.data.trackId);
          console.log("myMusic:", myMusic);
          console.log("mp4:", mp4);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  useEffect(() => {
    console.log("useEffect실행");

    viewMyFeed(nickname);
  }, [nickname]);

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        top: "430px",
      }}
    >
      <GridBox>
        {myMusic &&
          myMusic.map((musicData, index) => {
            return (
              <Item key={index}>
                <Link to={`/search-result?trackId=${musicData.trackId}`}>
                  <img
                    src={musicData.albumCover}
                    style={{ width: "100%" }}
                    alt="Album cover"
                    onClick={() => handleImageClick(mp4)}
                  />
                </Link>
              </Item>
            );
          })}
      </GridBox>
      <audio src={selectedAudio} autoPlay={isPlaying} />
    </div>
  );
}

const GridBox = styled.div`
  /* width: 360px; */
  /* border: 1px solid red; */
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  max-height: 340px;
  overflow-y: auto;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 10px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Item = styled.div`
  /* padding: 4rem; */
  /* border: 0.01rem solid gray; */
  background: #f4f4f4;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  /* width: 100%; */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
