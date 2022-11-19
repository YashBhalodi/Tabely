import React from "react";
import { useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import { useApp } from "Hooks";

import { TopHeader, FeedItem } from "./Components";
import _ from "lodash";

const SectionSeparator = (props) => {
  const { text = "OR" } = props;
  return (
    <div className="flex flex-row items-center justify-center w-full px-4">
      <hr className="border-blue-500/20 flex-1" />
      <div className="text-blue-500/20 mx-2 font-medium">{text}</div>
      <hr className="border-blue-500/20 flex-1" />
    </div>
  );
};

const CreateBoardButton = (props) => {
  const { onClick } = props;
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="shadow-blue-100 group-hover:border-blue-700 group-hover:shadow-blue-700 flex flex-col items-center justify-center w-48 h-32 transition-all border-2 border-blue-200 rounded-md shadow-sm">
        <FiPlus className="group-hover:text-blue-700 text-2xl text-blue-200" />
      </div>
      <div className="group-hover:text-blue-700 group-hover:scale-105 group-hover:translate-y-1 mt-2 text-sm font-medium text-center text-blue-800 transition-all">
        Create a new board
      </div>
    </div>
  );
};

const BoardFeed = () => {
  const navigate = useNavigate();
  const { boardsData, createBoard } = useApp();

  const navigateToBoard = () => {
    navigate(createBoard());
  };

  const sectionContainerClass = "flex flex-col w-full pt-8 pb-4 space-y-8";
  const sectionTitleClass =
    "underline-offset-2 decoration-blue-200 text-2xl font-semibold text-blue-600 underline;";

  return (
    <div className="flex flex-col items-start justify-center w-full h-full">
      <TopHeader />
      <div className="bg-slate-100 scrollbar flex-1 w-full h-full overflow-auto">
        <div className="flex flex-col items-start justify-start w-3/4 h-full m-auto">
          <section className={sectionContainerClass}>
            <div className="scrollbar-hide flex flex-row items-center self-start justify-start w-full space-x-4 overflow-auto">
              <CreateBoardButton onClick={navigateToBoard} />
            </div>
          </section>
          {_.isEmpty(boardsData) ? (
            <></>
          ) : (
            <>
              <SectionSeparator />
              <section className={sectionContainerClass}>
                <h1 className={sectionTitleClass}>Continue working</h1>
                <div className="pb-8 space-y-4">
                  {boardsData.map((board) => (
                    <FeedItem board={board} key={board.id} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardFeed;
