import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { UIModal } from "Components";
import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";
import { FiEdit3, FiEye, FiMinimize2 } from "react-icons/fi";

const CardContentModal = (props) => {
  const { isModalOpen, closeModal, cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const [showContentPreview, setShowContentPreview] = useState(false);
  const { title = "", content = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({ [e.target.name]: e.target.value });
  };

  const commonTitleClass = `${themeItem.darkTextColor} text-xl font-medium break-words`;
  const commonContentClass = `flex-1 p-4 rounded-md text-lg font-medium whitespace-pre-wrap leading-8 ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-scroll`;
  const commonTextAreaClass = ` ${themeItem.lightBgColor} ${themeItem.scrollbar} rounded-md px-2 py-1 mix-blend-multiply outline-none resize-none border-0`;

  return (
    <UIModal isOpen={isModalOpen} onRequestClose={closeModal}>
      <div
        className={`relative w-modal h-modal py-8 px-6 border-4 shadow-md rounded-lg flex flex-col space-y-4 ${themeItem.lightBgBorderColor} ${themeItem.lightBgColor}`}
      >
        <div
          className={`absolute top-1 right-1 hover:p-1.5 p-1 transition-all rounded-md cursor-pointer ${themeItem.lightBgColor} mix-blend-multiply`}
          onClick={closeModal}
        >
          <FiMinimize2 className={`${themeItem.darkTextColor} text-xl`} />
        </div>
        {!isEditMode ? (
          <>
            <div className={`${commonTitleClass}`}>{title}</div>
            <div
              className={`flex-1 p-4 rounded-md ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-auto max-w-none prose prose-lg`}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </>
        ) : (
          <>
            <textarea
              type={"text"}
              name="title"
              value={title}
              rows={2}
              onChange={handleTextChange}
              className={`${commonTitleClass} ${commonTextAreaClass} px-2 py-1`}
              placeholder=". . .  ✍🏻"
            />

            <div className="relative flex flex-col flex-1 overflow-auto">
              {showContentPreview ? (
                <div
                  className={`h-auto p-4 rounded-md ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-auto max-w-none prose prose-lg`}
                >
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  type={"text"}
                  name="content"
                  value={content}
                  onChange={handleTextChange}
                  className={`${commonContentClass} ${commonTextAreaClass}`}
                  placeholder=". . .  ✍🏻"
                />
              )}
              <div
                className={`absolute top-3 right-3 p-2 ${themeItem.lightBgColor} rounded-md border ${themeItem.lightBgBorderColor} hover:p-3 transition-all`}
                onClick={() => {
                  setShowContentPreview(!showContentPreview);
                }}
              >
                {showContentPreview ? (
                  <FiEdit3 className={`${themeItem.darkTextColor} text-lg`} />
                ) : (
                  <FiEye className={`${themeItem.darkTextColor} text-lg`} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </UIModal>
  );
};

export default CardContentModal;
