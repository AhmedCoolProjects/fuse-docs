import React from "react";
import { ApiParamBaseInput } from "./ApiParamBaseInput";

export const ApiParamBooleanField = (props) => {
  return <ApiParamBaseInput {...props} enum={[false, true]} />;
};
