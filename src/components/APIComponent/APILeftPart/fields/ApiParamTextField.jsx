import React from "react";
import { ApiParamBaseInput } from "./ApiParamBaseInput";

export const ApiParamTextField = (props) => {
  return <ApiParamBaseInput {...props} enum={props.param.enum} />;
};
