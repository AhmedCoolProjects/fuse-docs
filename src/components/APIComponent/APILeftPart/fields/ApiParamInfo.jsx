import React from "react";
import Markdown from "markdown-to-jsx";
import styles from "../styles.module.css";
import { PRIMITIVE_TYPES } from "../_consts";

export const ApiParamInfo = ({ param }) => (
  <div className={styles.fieldInfo}>
    <div className={styles.paramTitle}>
      {param.name && <span className={styles.paramName}>{param.name}</span>}
      <span className={styles.paramType}>{param.type}</span>
      {param.required && <span className={styles.paramRequired}>required</span>}
    </div>

    {param.description && (
      <div className={styles.paramDescription}>
        <Markdown>{param.description}</Markdown>
      </div>
    )}
  </div>
);

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

export const validateField = (param) => (value) => {
  if (!PRIMITIVE_TYPES.includes(param.type)) return;

  if (param.type === "json" && value != null) {
    try {
      if (typeof value === "string") JSON.parse(value);
    } catch {
      return "Invalid JSON";
    }
  }
};

export const buildParamPath = (param, prefix) =>
  [prefix, typeof param === "string" ? param : param.name]
    .filter((x) => x != null)
    .join(".") || null;
