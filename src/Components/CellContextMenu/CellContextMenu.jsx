import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { usePopper } from "react-popper";

import {
  ThemePicker,
  ClearCell,
  TableLayoutActions,
  TableLayoutDestructiveActions,
  TypeSwitcher,
} from "./Components";

import { useCell, useBoard, useClickOutside } from "Hooks";
import { COLOR_THEME } from "Utils/colors";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";
import _ from "lodash";

const FEATURE_COMPONENT_MAP = {
  [FEATURES.ADD_TABLE_LAYOUT]: TableLayoutActions,
  [FEATURES.DELETE_TABLE_LAYOUT]: TableLayoutDestructiveActions,
  [FEATURES.CONVERT_TYPE]: TypeSwitcher,
  [FEATURES.CHANGE_THEME]: ThemePicker,
  [FEATURES.CLEAR_CELL]: ClearCell,
};

const Separator = ({ theme }) => {
  return (
    <div
      className={`self-stretch w-1 my-1 rounded-full border-2 ${theme.lightBgBorderColor} opacity-20`}
    />
  );
};

const ContextMenu = (props, ref) => {
  const { cellId, containerRef } = props;
  const [visible, setVisibility] = useState(false);
  const { boardId } = useParams();
  const { mode } = useBoard({ id: boardId });
  const { cellData } = useCell({ id: cellId });
  const { colorTheme = "STONE", type } = cellData;
  const theme = COLOR_THEME[colorTheme];

  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    containerRef.current,
    popperRef.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            mainAxis: true,
            altAxis: true,
            padding: { right: 32 },
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 2],
          },
        },
      ],
    }
  );

  useImperativeHandle(ref, () => {
    return {
      toggleContextView: handleDropdownClick,
      isOpen: visible,
    };
  });

  useClickOutside({
    containerRef: [containerRef, popperRef],
    onClickOutside: () => setVisibility(false),
  });

  function handleDropdownClick(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    setVisibility(!visible);
  }

  const isContextMenuAllowed = CELL_CONFIGS[mode][type].features.includes(
    FEATURES.CONTEXT_MENU
  );
  const cellTypeContextMenuFeatures =
    CELL_CONFIGS[mode][type].contextMenuFeatures;

  if (!isContextMenuAllowed) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 110 }}
        {...attributes.popper}
      >
        {visible ? (
          <div
            style={styles.offset}
            className={`${
              visible ? "visible" : "invisible"
            } h-fit w-fit border rounded-md shadow-sm px-3 py-2 flex flex-row space-x-4 justify-center items-center cursor-auto ${
              theme.lightBgColor
            } ${theme.lightBgBorderColor}`}
          >
            {_.map(cellTypeContextMenuFeatures, (feature, index) => {
              const Component = FEATURE_COMPONENT_MAP[feature];
              const isLast = index === cellTypeContextMenuFeatures.length - 1;

              return (
                <div
                  key={feature}
                  className={`h-fit w-fit flex flex-row justify-center items-center space-x-4`}
                >
                  <Component cellId={cellId} />
                  {!isLast ? <Separator theme={theme} /> : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

const ContextMenuForwardedRef = forwardRef(ContextMenu);

ContextMenuForwardedRef.propTypes = {
  cellId: PropTypes.string.isRequired,
  // ref: PropTypes.shape({ current: PropTypes.object }), // this doesn't actually work, but keeping it here for documenting purpose
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ContextMenuForwardedRef;
