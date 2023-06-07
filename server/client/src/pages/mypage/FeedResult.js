import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import NotiBox from "../../components/notification/NotiBox";
import styled from "styled-components";
import { AddModal } from "../../components/notification/AddModal";
import FootBar from "../../components/footer/FootBar";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteIcon from "@material-ui/icons/Delete";

export default function FeedResult(props) {
  const [trackData, setTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [mp4, setMp4] = useState("");
  const [trackid, setTrackid] = useState("");
  const [albumCover, setAlbumCover] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objId = searchParams.get("_id");
  // const [objId, setObjId] = useState("");

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  let { id } = useParams();

  let findId = props.shoes.find(function (item) {
    return item.id == id;
  });

  const handleSelectedTrack = (track, index) => {
    setSelectedTrackIndex(index);
    console.log("index:", index);
    setSelectedTrack(track);
    setIsPlaying(true);
    console.log(artist);
    console.log(sessionStorage.getItem("user_token"));
  };

  useEffect(() => {
    const fetchMyMusic = async () => {
      console.log("fetchMyMusic");
      try {
        const response = await axios.get(`http://localhost:5000/song/mypost`, {
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        });
        console.log("response-data", response.data);
        setTrackData(response.data.results[0]);

        // setObjId(response.data._id);
        // console.log(objId);
        setArtist(response.data.artistName);
        setSong(response.data.results[0].trackName);
        setAlbumCover(response.data.results[0].artworkUrl100);
        setMp4(response.data.results[0].previewUrl);
        setTrackid(response.data.results[0].trackId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMyMusic();
  }, [objId]);

  const handleImageClick = (audioUrl) => {
    setSelectedAudio(audioUrl);
    setIsPlaying(true);
    console.log(artist);
    console.log(sessionStorage.getItem("user_token"));
  };

  const handleDeletePost = () => {
    console.log("handleDeletePost시작");

    axios
      .delete(`http://localhost:5000/song/deletepost/${objId}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data:", res.data);
        alert(res.data.message);
        document.location.href = "/profile";
      })
      .catch((err) => {
        console.log("err:", err);
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
        <p style={{ color: "white" }}>he1llo</p>

        {/* {trackData && (
          <AlbumImg>
            <img
              // src={trackData[selectedTrackIndex].albumCover}
              style={{ width: "250px" }}
              alt="album cover"
              onClick={() =>
                handleSelectedTrack(
                  trackData[selectedTrackIndex],
                  selectedTrackIndex
                )
              }
            />
          </AlbumImg>
        )} */}
        {/* {trackData && trackData.results && (
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
        )} */}
        <audio src={selectedAudio} autoPlay={isPlaying} />
        <DeleteIcon
          style={{
            position: "fixed",
            top: "15px",
            right: "160px",
            color: "white",
          }}
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            console.log("눌림");
            handleDeletePost();
          }}
        />
        <AddDeleteBtnn
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            console.log("눌림");
          }}
        >
          Delete from my playlist
        </AddDeleteBtnn>
        {modalIsOpen === true
          ? modalIsOpen && (
              <NotiBox
                noti="You have deleted successfully!"
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
