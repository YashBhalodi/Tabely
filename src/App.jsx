import { Routes, Route } from "react-router-dom";

import {
  Home,
  BoardFeed,
  Board,
  Contact,
  RoadMap,
  Updates,
  NotFoundPage,
} from "./Routes";

import { NavBar } from "Components";

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<BoardFeed />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
