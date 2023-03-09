import React, { useCallback } from "react";
import { ApiParamBaseInput } from "./ApiParamBaseInput";

export const ApiParamJSONField = (props) => {
  const valueToString = useCallback(
    (value) => (typeof value === "string" ? value : JSON.stringify(value)),
    []
  );
  const stringToValue = useCallback((value) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }, []);

  return (
    <ApiParamBaseInput
      {...props}
      valueToString={valueToString}
      stringToValue={stringToValue}
      multiline
    />
  );
};
