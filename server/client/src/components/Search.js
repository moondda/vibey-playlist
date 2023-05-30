import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {

  const [searchResult, setSearchResult]=useState("");
  return (
    <Container>
      <SearchInput placeholder="surf your wave!" value={searchResult} onChange={(e) => setSearchResult(e.target.value)} />
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

const Container = styled.div``;

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
`;
