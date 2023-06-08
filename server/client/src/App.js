import React from "react";
import RootRoute from "./routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <RootRoute />
    </RecoilRoot>
  );
}

export default App;
