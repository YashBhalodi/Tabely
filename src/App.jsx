import { Routes, Route } from "react-router-dom";

import { Home, Board, Contact, RoadMap, Updates, NotFoundPage } from "./Routes";

import { NavBar } from "Components";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
