import React, { useCallback, useState } from "react";
import NotiBox from "./NotiBox";
import styled from "styled-components";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const AddModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalHandler = (setter) => {
    setter(true);
    setTimeout(() => {
      console.log("타임아웃");
      setter(false);
    }, 1000);
  };

  return (
    <div>
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
        }}
      />
      <AddDeleteBtn
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
          console.log("눌림");
        }}
      >
        Add to my playlist
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
  );
};

const AddDeleteBtn = styled.button`
  background-color: #5e5e5e;
  border: none;
  color: white;
  margin: 18px 13px 18px 13px;
  right: 0;
  top: 0;
  position: fixed;
`;
