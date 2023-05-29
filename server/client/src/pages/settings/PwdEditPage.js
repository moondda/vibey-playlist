import React from "react";
import Title from "../../components/Title";
import FootBar from "../../components/footer/FootBar";
import PwdEdit from "./PwdEdit";

export default function PwdEditPage() {
  return (
    <div className="App">
      <Title title="비밀번호 수정" />
      <PwdEdit />

      <FootBar />
    </div>
  );
}
