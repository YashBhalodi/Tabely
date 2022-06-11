import { Routes, Route } from "react-router-dom";

import { Home, Board, Contact, RoadMap, Updates, NotFoundPage } from "./Routes";

import { NavBar } from "Components";

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
