import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Profile() {
  const [myMusic, setMyMusic] = useState([]);

  const viewMyFeed = () => {
    axios
      .get("http://localhost:5000/song/mypost", {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data:", res.data);
        setMyMusic(res.data);
        console.log("myMusic:", myMusic);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    console.log("useEffect실행");
    // const fetchMyFeed = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/song/mypost", {
    //       headers: {
    //         Authorization: `${sessionStorage.getItem("user_token")}`,
    //       },
    //     });
    //     setMyMusic(response.data);
    //     console.log("mymusic:", myMusic);
    //     console.log("res.data:", response.data);
    //   } catch (err) {
    //     console.error("err:", err);
    //   }
    // };
    // fetchMyFeed();
    viewMyFeed();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        top: "380px",
      }}
    >
      <GridBox>
        {myMusic &&
          myMusic.map((musicData, index) => {
            return (
              <Item key={index}>
                {/* <Link to={`/search-result?trackId=${musicData.trackId}`}> */}
                <img src={musicData.albumCover} style={{ width: "100%" }} />
                {/* </Link> */}
              </Item>
            );
          })}
      </GridBox>
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
  max-height: 580px;
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
