import React from "react";

import ApiParamBaseInput from "./ApiParamBaseInput";

const ApiParamTextField = (props) => {
  return <ApiParamBaseInput {...props} enum={props.param.enum} />;
};

export default ApiParamTextField;
