import React from "react";
import MainHome from "./Main";
import Title from "../../components/Title";
import SearchBar from "../../components/Search";
import FootBar from "../../components/footer/FootBar";

export default function HomePage() {
  return (
    <div className="App">
      <Title title="서핑" />
      <SearchBar />
      {/* <MainHome /> */}
      <FootBar />
    </div>
  );
}
