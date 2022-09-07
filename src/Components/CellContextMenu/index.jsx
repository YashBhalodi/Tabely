import React, { lazy, Suspense } from "react";
const Comp = lazy(() => import("./CellContextMenu"));

const Wrapped = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <Comp {...props} />
    </Suspense>
  );
};
export default Wrapped;
