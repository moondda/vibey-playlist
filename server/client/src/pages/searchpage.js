import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

export default function Searchpage() {
  const [artist, setArtist] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("/searchsong", {
        artist: artist,
      });

      const data = response.data;
      console.log(data);
      setSongs(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.name} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}
