import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9;

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrolledToBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight;
  //     if (isScrolledToBottom) {
  //       loadMoreItems();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  // const loadMoreItems = () => {
  //   if (currentPage * itemsPerPage >= searchResult.length) return;
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/song/search?term=${searchItem}`,
        {
          artist: searchItem,
        }
      );
      console.log("response:", response);
      console.log(response.data);
      setSearchResult(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const currentItems = searchResult.slice(0, currentPage * itemsPerPage);

  return (
    <Container>
      <SearchInput
        placeholder="surf your wave!"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        onKeyPress={handleSearch}
      />
      <GridBox>
        {searchResult &&
          searchResult.map((musicData, index) => {
            return (
              <Item key={index}>
                <img src={musicData.artworkUrl100} />
              </Item>
            );
          })}
      </GridBox>

      <div
        style={{
          position: "absolute",
          top: "133px",
          right: "40px",
          height: "40px",
          color: "gray",
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
`;

const GridBox = styled.div`
  /* border: 3px solid red; */
  margin: 0 auto;
  display: grid;
  /* place-items: center; */
  /* flex-wrap: wrap; */
  margin-top: 120px;
  grid-template-columns: repeat(3, 1fr);
  max-height: 580px;
  overflow-y: auto;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 10px;
`;

const Item = styled.div`
  /* padding: 4rem; */
  background: #f4f4f4;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SearchInput = styled.input`
  position: absolute;
  height: 40px;
  left: 30px;
  right: 30px;
  top: 125px;
  border: none;
  background: #cdcdcd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  /* margin: 0 auto; */
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
`;
