import React, { lazy, Suspense } from "react";
const Comp = lazy(() => import("./UIModal"));

const Wrapped = (props) => {
  return (
    <Suspense>
      <Comp {...props} />
    </Suspense>
  );
};
export default Wrapped;
