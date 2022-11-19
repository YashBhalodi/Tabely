import React, { useState, useRef } from "react";
import _ from "lodash";
import { TbKeyboard } from "react-icons/tb";
import { usePopper } from "react-popper";
import { useClickOutside } from "Hooks";
import {
  FiArrowUp,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiCommand,
} from "react-icons/fi";
import { ImOpt } from "react-icons/im";
import { MdKeyboardArrowUp } from "react-icons/md";
import { COLOR_THEME } from "Utils/colors";

const isMac = navigator.appVersion.indexOf("Mac") != -1;
const CommandEquivalent = isMac ? FiCommand : "ctrl"; // todo verify this
const OptEquivalent = isMac ? ImOpt : "alt";
const ControlEquivalent = isMac ? MdKeyboardArrowUp : "ctrl";

const keyCombinations = [
  {
    title: "Navigating in the board",
    sectionActions: [
      {
        keys: [FiArrowUp],
        description: "select the cell above",
      },
      {
        keys: [FiArrowDown],
        description: "select the cell below",
      },
      {
        keys: [FiArrowLeft],
        description: "select the cell to the left",
      },
      {
        keys: [FiArrowRight],
        description: "select the cell to the right",
      },
    ],
  },
  {
    title: "Board actions",
    sectionActions: [
      {
        keys: [CommandEquivalent, "M"],
        description: "toggle board mode (edit/view)",
      },
    ],
  },
  {
    title: "Add to board",
    sectionActions: [
      {
        keys: [CommandEquivalent, FiArrowUp],
        description: "add row above",
      },
      {
        keys: [CommandEquivalent, FiArrowDown],
        description: "add row below",
      },
      {
        keys: [CommandEquivalent, FiArrowLeft],
        description: "add column to left",
      },
      {
        keys: [CommandEquivalent, FiArrowRight],
        description: "add column to right",
      },
    ],
  },
  {
    title: "Delete from board",
    sectionActions: [
      {
        keys: [CommandEquivalent, "shift", "r"],
        description: "delete current row",
      },
      {
        keys: [CommandEquivalent, "shift", "c"],
        description: "delete current column",
      },
      {
        keys: [CommandEquivalent, "del"],
        description: "delete current cell",
      },
    ],
  },
  {
    title: "Change cell type",
    sectionActions: [
      {
        keys: [CommandEquivalent, "shift", "1"],
        description: "basic type",
      },
      {
        keys: [CommandEquivalent, "shift", "2"],
        description: "dual field type",
      },
      {
        keys: [CommandEquivalent, "shift", "3"],
        description: "card type",
      },
    ],
  },
  {
    title: "Change cell theme",
    sectionActions: _.map(COLOR_THEME, (item, key) => {
      const { label, shortCutKey } = item;
      return {
        keys: [ControlEquivalent, shortCutKey],
        description: label,
        color: key,
      };
    }),
  },
];

const KeyBoardKeyHelpOverlay = (props) => {
  return (
    <div className="w-[30vw] h-[70vh] mr-5 bg-gray-50 border border-gray-200 rounded-lg shadow-md py-2 flex flex-col gap-4">
      <h5 className="text-blue-800/50 self-center text-lg font-medium">
        Keyboard shortcuts
      </h5>
      <div className="scrollbar scrollbar-gray flex flex-col gap-6 pl-4 overflow-auto">
        {_.map(keyCombinations, (sectionObj) => {
          const { title, sectionActions } = sectionObj;
          return (
            <section key={title}>
              {title ? (
                <h6 className="text-blue-700/60 mb-2 font-medium">{title}</h6>
              ) : null}
              <ul className="flex flex-col gap-2">
                {_.map(sectionActions, (keyAction) => {
                  const { keys, description, color } = keyAction;

                  return (
                    <li
                      className="hover:bg-blue-50/50 mix-blend-multiply flex flex-row-reverse items-center justify-between gap-2 px-2 py-1 mr-2 text-blue-800 rounded cursor-default"
                      key={description}
                    >
                      <div className="flex flex-row gap-1">
                        {_.map(keys, (Key, index) => {
                          return (
                            <kbd key={index}>
                              {_.isString(Key) ? Key : <Key />}
                            </kbd>
                          );
                        })}
                      </div>
                      <div className="flex flex-row-reverse items-center gap-2">
                        <div className="flex flex-1">{description}</div>
                        {color ? (
                          <div
                            className={`w-4 h-4 rounded-full ${COLOR_THEME[color].bgColor}`}
                          />
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
};

const KeyBoardToolTipButton = (props) => {
  const [isPopperVisible, setIsPopperVisible] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 10],
          },
        },
      ],
    }
  );

  useClickOutside({
    containerRef: [referenceRef, popperRef],
    onClickOutside: () => togglePopover(false),
  });

  const togglePopover = (value) => {
    if (!_.isUndefined(value)) {
      setIsPopperVisible(value);
      return;
    }
    setIsPopperVisible((prev) => !prev);
  };

  return (
    <>
      <div
        ref={referenceRef}
        onClick={togglePopover}
        className="bottom-4 right-4 bg-blue-100/70 hover:bg-blue-200/90 hover:scale-110 absolute flex flex-row items-center justify-center w-12 h-12 transition-all rounded-full shadow-md cursor-pointer"
      >
        <TbKeyboard className="text-2xl text-blue-900" />
      </div>
      <div
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        className={isPopperVisible ? "flex" : "hidden"}
      >
        <KeyBoardKeyHelpOverlay />
      </div>
    </>
  );
};

export default KeyBoardToolTipButton;
