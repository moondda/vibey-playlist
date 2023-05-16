import React, { useState } from "react";
import NotiBox from "./NotiBox";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";

export const DeleteModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <DeleteIcon
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
              noti="You have deleted successfully!"
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
