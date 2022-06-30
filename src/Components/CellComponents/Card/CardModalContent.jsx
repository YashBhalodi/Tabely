import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";
import { FiEdit3, FiEye } from "react-icons/fi";

const ContentMarkDown = ({ content }) => {
  return <ReactMarkdown linkTarget={"_blank"}>{content}</ReactMarkdown>;
};

const ContentComponent = (props) => {
  const { cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const { content = "", colorTheme } = cellData;
  const [showContentPreview, setShowContentPreview] = useState(
    Boolean(content)
  );
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({ [e.target.name]: e.target.value });
  };

  const togglePreview = () => {
    setShowContentPreview(!showContentPreview);
  };

  const commonContentClass = `flex-1 p-4 rounded-md text-lg font-medium whitespace-pre-wrap leading-8 ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-scroll`;
  const commonTextAreaClass = ` ${themeItem.lightBgColor} ${themeItem.scrollbar} rounded-md px-2 py-1 mix-blend-multiply outline-none resize-none border-0`;
  const previewIconClass = `${themeItem.darkTextColor} text-lg`;

  return (
    <div className="flex-1 h-full">
      {!isEditMode ? (
        <div
          className={`flex-1 h-full p-4 rounded-md ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-auto max-w-none prose prose-lg`}
        >
          <ContentMarkDown content={content} />
        </div>
      ) : (
        <div className="relative flex flex-col h-full overflow-auto">
          {showContentPreview ? (
            <div
              className={`h-full p-4 rounded-md ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-auto max-w-none prose prose-lg`}
            >
              <ContentMarkDown content={content} />
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
            onClick={togglePreview}
          >
            {showContentPreview ? (
              <FiEdit3 className={previewIconClass} />
            ) : (
              <FiEye className={previewIconClass} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ContentComponent);
