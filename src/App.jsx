import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { NavBar } from "Components";

const Home = React.lazy(() => import("./Routes/Home"));
const BoardFeed = React.lazy(() => import("./Routes/BoardFeed"));
const Board = React.lazy(() => import("./Routes/Board"));
const Contact = React.lazy(() => import("./Routes/Contact"));
const RoadMap = React.lazy(() => import("./Routes/Roadmap"));
const Updates = React.lazy(() => import("./Routes/Updates"));
const NotFoundPage = React.lazy(() => import("./Routes/404"));
import { useRegisterActions } from "kbar";
const actions = [
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "writing words",
    perform: () => (window.location.pathname = "blog"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email",
    perform: () => (window.location.pathname = "contact"),
  },
];

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<div>Loading</div>}>{children}</Suspense>;
};

const App = () => {
  useRegisterActions(actions);
  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBar />
      {/* <GlobalSearch /> */}
      <SuspenseWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <SuspenseWrapper>
                <Home />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/boards"
            element={
              <SuspenseWrapper>
                <BoardFeed />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/boards/:boardId"
            element={
              <SuspenseWrapper>
                <Board />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/updates"
            element={
              <SuspenseWrapper>
                <Updates />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/roadmap"
            element={
              <SuspenseWrapper>
                <RoadMap />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <SuspenseWrapper>
                <Contact />
              </SuspenseWrapper>
            }
          />
          <Route
            path="*"
            element={
              <SuspenseWrapper>
                <NotFoundPage />
              </SuspenseWrapper>
            }
          />
        </Routes>
      </SuspenseWrapper>
    </div>
  );
};

export default App;
