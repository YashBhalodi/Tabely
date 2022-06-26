import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";

import {
  ThemePicker,
  ClearCell,
  TableLayoutActions,
  TableLayoutDestructiveActions,
  CardSwitcher,
} from "./Components";

import { useCell } from "Hooks";
import { COLOR_THEME } from "Utils/colors";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";
import _ from "lodash";

const FEATURE_COMPONENT_MAP = {
  [FEATURES.ADD_TABLE_LAYOUT]: TableLayoutActions,
  [FEATURES.DELETE_TABLE_LAYOUT]: TableLayoutDestructiveActions,
  [FEATURES.CONVERT_TYPE]: CardSwitcher,
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
      launchContextMenu: handleDropdownClick,
    };
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleDocumentClick(event) {
    if (
      containerRef.current?.contains(event.target) ||
      popperRef.current?.contains(event.target)
    ) {
      return;
    }
    setVisibility(false);
  }

  function handleDropdownClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setVisibility(!visible);
  }

  const isContextMenuAllowed = CELL_CONFIGS[type].features.includes(
    FEATURES.CONTEXT_MENU
  );
  const cellTypeContextMenuFeatures = CELL_CONFIGS[type].contextMenuFeatures;

  if (!isContextMenuAllowed) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 10 }}
        {...attributes.popper}
      >
        <div
          style={styles.offset}
          className={`${
            visible ? "visible" : "hidden"
          } h-fit w-fit border rounded-md shadow-sm px-3 py-2 flex flex-row space-x-4 justify-center items-center cursor-auto ${
            theme.lightBgColor
          } ${theme.lightBgBorderColor}`}
        >
          {_.map(cellTypeContextMenuFeatures, (feature, index) => {
            const Component = FEATURE_COMPONENT_MAP[feature];
            const isLast = index === cellTypeContextMenuFeatures.length - 1;

            return (
              <>
                <Component cellId={cellId} />
                {!isLast ? <Separator theme={theme} /> : null}
              </>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const ContextMenuForwardedRef = forwardRef(ContextMenu);

ContextMenuForwardedRef.propTypes = {
  cellId: PropTypes.string.isRequired,
  ref: PropTypes.shape({ current: PropTypes.object }), // this doesn't actually work, but keeping it here for documenting purpose
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ContextMenuForwardedRef;
