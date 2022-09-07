import React, { Suspense, lazy } from "react";

const IdleLazyLoaded = lazy(() => import("./Idle"));
const BasicLazyLoaded = lazy(() => import("./Basic"));
const BlankLazyLoaded = lazy(() => import("./Blank"));
const DualFieldLazyLoaded = lazy(() => import("./DualField"));
const CardLazyLoaded = lazy(() => import("./Card"));

const SuspenseWrapper = ({ children }) => {
  return <Suspense>{children}</Suspense>;
};

const Idle = (props) => (
  <SuspenseWrapper>
    <IdleLazyLoaded {...props} />
  </SuspenseWrapper>
);

const Basic = (props) => (
  <SuspenseWrapper>
    <BasicLazyLoaded {...props} />
  </SuspenseWrapper>
);

const Blank = (props) => (
  <SuspenseWrapper>
    <BlankLazyLoaded {...props} />
  </SuspenseWrapper>
);

const DualField = (props) => (
  <SuspenseWrapper>
    <DualFieldLazyLoaded {...props} />
  </SuspenseWrapper>
);

const Card = (props) => (
  <SuspenseWrapper>
    <CardLazyLoaded {...props} />
  </SuspenseWrapper>
);

export { Idle, Basic, Blank, DualField, Card };
