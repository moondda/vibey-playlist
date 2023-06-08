import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NotiBox from "../../components/notification/NotiBox";
import styled from "styled-components";
import { AddModal } from "../../components/notification/AddModal";
import FootBar from "../../components/footer/FootBar";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteIcon from "@material-ui/icons/Delete";

export default function SearchResultPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trackId = searchParams.get("trackId");

  const [trackData, setTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [mp4, setMp4] = useState("");
  const [trackid, setTrackid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axios.get(
          `https://itunes.apple.com/lookup?id=${trackId}&entity=song`
        );
        console.log("여기", response.data.results[0]);
        setTrackData(response.data);
        setArtist(response.data.results[0].artistName);
        setSong(response.data.results[0].trackName);
        setAlbumCover(response.data.results[0].artworkUrl100);
        setMp4(response.data.results[0].previewUrl);
        setTrackid(response.data.results[0].trackId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTrackData();
  }, [trackId]);

  const handleImageClick = (audioUrl) => {
    setSelectedAudio(audioUrl);
    setIsPlaying(true);
    console.log(artist);
    console.log(sessionStorage.getItem("user_token"));
  };

  const handleSongPost = () => {
    axios
      .post(
        "http://localhost:5000/song/posting",
        {
          artist: artist,
          song: song,
          albumCover: albumCover,
          mp4: mp4,
          trackId: trackid,
          //postedBy도 날라감
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

  const handleSongDelete = () => {
    axios
      .delete(`http://localhost:5000/song/deletepost/${trackId}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((response) => {
        console.log("포스팅이 삭제되었습니다.");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {trackData && trackData.results && (
          <div className="today_music">
            <AlbumImg>
              {trackData.results[0] && (
                <img
                  src={albumCover}
                  style={{ width: "250px" }}
                  alt="Album cover"
                  onClick={() => handleImageClick(mp4)}
                />
              )}
            </AlbumImg>
            {trackData.results[0] && (
              <DescripBox>
                <MusicTitle>{song}</MusicTitle>
                <div>{artist}</div>
              </DescripBox>
            )}
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

        <DeleteIcon
          style={{
            position: "fixed",
            top: "45px",
            right: "160px",
            color: "white",
          }}
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            console.log("눌림");
            handleSongDelete();
            navigate("/profile");
          }}
        />
        <AddDeleteBtn
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            console.log("눌림");
            handleSongDelete();
            navigate("/profile");
          }}
        >
          Delete from my playlist
        </AddDeleteBtn>
        {modalIsOpen === true
          ? modalIsOpen && (
              <NotiBox
                noti="You have added successfully!"
                onClose={setModalIsOpen}
              />
            )
          : null}
      </div>

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

const AddDeleteBtnn = styled.button`
  background-color: #252525;
  border: none;
  color: white;
  margin: 18px 13px 18px 13px;
  right: 0;
  top: 0;
  position: fixed;
`;

const AddDeleteBtn = styled.button`
  background-color: #252525;
  border: none;
  color: white;
  margin: 18px 13px 18px 13px;
  right: 0;
  top: 30px;
  position: fixed;
`;
