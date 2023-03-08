import React from "react";
import { Field } from "formik";

import ApiParamInfo from "./ApiParamInfo";
import ApiParamTextField from "./ApiParamTextField";
import ApiParamNumberField from "./ApiParamNumberField";
import ApiParamBooleanField from "./ApiParamBooleanField";
import ApiParamJSONField from "./ApiParamJSONField";
import ApiParamArrayField from "./ApiParamArrayField";
import ApiParamRecordField from "./ApiParamRecordField";
import ApiParamObjectField from "./ApiParamObjectField";
import ApiParamOneOfField from "./ApiParamOneOfField";

import styles from "./styles.module.css";




const apiParamComponents  = {
  string: ApiParamTextField,
  number: ApiParamNumberField,
  boolean: ApiParamBooleanField,
  json: ApiParamJSONField,
  array: ApiParamArrayField,
  record: ApiParamRecordField,
  object: ApiParamObjectField,
  oneOf: ApiParamOneOfField,
};

export const PRIMITIVE_TYPES = [
  "string",
  "number",
  "boolean",
  "json",
];

export const buildParamPath = (param, prefix) =>
  [prefix, typeof param === "string" ? param : param.name]
    .filter((x) => x != null)
    .join(".") || null;



export const apiParamInitialValue = (param) => {
  if (param.type === "oneOf") {
    return {};
  }

  const path = param.name ? buildParamPath(param) : null;
  const value = PRIMITIVE_TYPES.includes(param.type)
    ? param.example
    : param.type === "object"
    ? param.fields?.reduce(
        (obj, field) => ({ ...obj, ...apiParamInitialValue(field) }),
        {}
      )
    : param.type === "array"
    ? []
    : param.type === "record"
    ? {}
    : undefined;

  if (path) {
    return { [path]: value };
  }

  return value;
};

const validateField = (param) => (value) => {
  if (!PRIMITIVE_TYPES.includes(param.type)) return;

  if (param.type === "json" && value != null) {
    try {
      if (typeof value === "string") JSON.parse(value);
    } catch {
      return "Invalid JSON";
    }
  }
};

const ApiParamField = ({ prefix, param }) => {
  const Component = apiParamComponents[param.type];
  const field = (
    <Field name={buildParamPath(param, prefix)} validate={validateField(param)}>
      {(props) => <Component {...props} param={param} />}
    </Field>
  );

  return (
    <div className={styles.field}>
      {PRIMITIVE_TYPES.includes(param.type) ? (
        <>
          <ApiParamInfo param={param} />

          <div className={styles.fieldInput}>{field}</div>
        </>
      ) : (
        field
      )}
    </div>
  );
};

export default ApiParamField;
