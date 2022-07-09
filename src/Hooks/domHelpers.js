import { useEffect } from "react";
import _ from "lodash";

export const useClickOutside = ({ containerRef, onClickOutside }) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (e) => {
    e.stopPropagation();
    if (_.isArray(containerRef)) {
      if (
        !_.some(containerRef, (itemRef) => {
          const res = itemRef.current.contains(e.target);
          return res;
        })
      ) {
        onClickOutside?.();
      }
    } else {
      if (!containerRef.current.contains(e.target)) {
        onClickOutside?.();
      }
    }
  };
};
