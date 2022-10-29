import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const BoardFeed = React.lazy(() => import("./Routes/BoardFeed"));
const Board = React.lazy(() => import("./Routes/Board"));
const NotFoundPage = React.lazy(() => import("./Routes/404"));

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<div>Loading</div>}>{children}</Suspense>;
};

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <SuspenseWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <SuspenseWrapper>
                <BoardFeed />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/:boardId"
            element={
              <SuspenseWrapper>
                <Board />
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
