import React, { useCallback } from "react";
import { ApiParamBaseInput } from "./ApiParamBaseInput";

export const ApiParamNumberField = (props) => {
  const valueToString = useCallback((value) => String(value), []);
  const stringToValue = useCallback((value) => parseInt(value, 10), []);

  return (
    <ApiParamBaseInput
      {...props}
      valueToString={valueToString}
      stringToValue={stringToValue}
    />
  );
};
