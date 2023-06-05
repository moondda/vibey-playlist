import React, { useEffect, useState } from "react";
import styled from "styled-components";
import songImg from "../../assets/golden_hour.jpg";
import axios from "axios";
import Loading from "./Loading";
import NotiBox from "../../components/notification/NotiBox";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

export default function TodayTemp() {
  const [loading, setLoading] = useState(true);

  const [todayMusic, SetTodayMusic] = useState([]);
  //today-music/random

  const [singer, setSinger] = useState("");
  const [title, setTitle] = useState("");
  const [musicImg, setMusicImg] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicPlay, setMusicPlay] = useState("");

  const recommendMusic = async () => {
    try {
      const res = await axios.get("http://localhost:5000/today-music/random");
      const { trackName, artistName, artwork, previewUrl } = res.data;

      setSinger(artistName);
      setTitle(trackName);
      setMusicImg(artwork);
      setMusicPlay(previewUrl);

      console.log("res:", res);
      setLoading(false);
    } catch (err) {
      console.error("err:", err);
    }
  };

  useEffect((e) => {
    console.log("useEffect실행됨");
    recommendMusic();
  }, []);

  const handleImageClick = (audioUrl) => {
    setSelectedAudio(audioUrl);
    setIsPlaying(true);
    console.log(singer);
    console.log(sessionStorage.getItem("user_token"));
  };

  const handleSongPost = () => {
    axios
      .post(
        "http://localhost:5000/song/posting",
        {
          artist: singer,
          song: title,
          albumCover: musicImg,
          mp4: musicPlay,
        },
        {
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((response) => {
        console.log("포스팅이 완료되었습니다.");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };
  // useEffect((e) => {
  //   async function fetchMusic() {
  //     const res = await axios.get("http://localhost:5000/today-music/random");
  //     const todayData = await res.data.map((rowData) => ({
  //       trackName: rowData.title,
  //       artistName: rowData.singer,
  //       artworkUrl100: rowData.musicImg,
  //     }));
  //     console.log(todayData);
  //     SetTodayMusic()
  //   }
  // });

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="today_music">
            <AlbumImg>
              <img
                src={musicImg}
                style={{ width: "250px", height: "250px" }}
                onClick={() => handleImageClick(musicPlay)}
              ></img>
            </AlbumImg>

            <DescripBox>
              <MusicTitle>{title}</MusicTitle>
              <div>{singer}</div>
            </DescripBox>
          </div>
        )}
        <audio src={selectedAudio} autoPlay={isPlaying} />
        <AddToPhotosIcon
          style={{
            position: "fixed",
            top: "15px",
            right: "130px",
            color: "white",
          }}
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            console.log("눌림");
            handleSongPost();
          }}
        />
        <AddDeleteBtnn
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            console.log("눌림");
          }}
        >
          Add to my playlist
        </AddDeleteBtnn>
        {modalIsOpen === true
          ? modalIsOpen && (
              <NotiBox
                noti="You have added successfully!"
                onClose={setModalIsOpen}
              />
            )
          : null}
      </div>

      {/* <div style={{ border: "1px solid pink" }}>노래 재생바?</div> */}
      {/* 아래에는 하단바 컴포넌트 넣기 */}
    </div>
  );
}

const TodayText = styled.div`
  /* border: 1px solid yellow; */
  font-style: bold;
  font-weight: 600;
  font-size: 30px;
  color: #ffffff;
`;

const AlbumBox = styled.div`
  background-color: black;
`;

const DescripBox = styled.div`
  /* background-color: pink; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const AlbumImg = styled.div`
  height: 250px;
  width: 250px;

  /* left: 0px;
  right: 0px; */
  /* top: calc(50% - 250px / 2 - 67px); */
  /* border: 1px solid white; */
  /* background: url(image.png); */
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 50px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const MusicTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const AddDeleteBtnn = styled.button`
  background-color: #5e5e5e;
  border: none;
  color: white;
  margin: 18px 13px 18px 13px;
  right: 0;
  top: 0;
  position: fixed;
`;
