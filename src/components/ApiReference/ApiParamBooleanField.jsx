import React from "react";

import ApiParamBaseInput from "./ApiParamBaseInput";

const ApiParamBooleanField = (props) => {
  return <ApiParamBaseInput {...props} enum={[false, true]} />;
};

export default ApiParamBooleanField;
