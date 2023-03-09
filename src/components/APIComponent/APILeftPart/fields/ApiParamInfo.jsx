import React, { useState, useCallback } from "react";
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

export const buildResponse = (field) => {
  if (PRIMITIVE_TYPES.includes(field?.type)) {
    return field?.example;
  }

  if (field.type === "array") {
    if (field.field?.type === "oneOf") {
      return [...field.field.options.map((option) => buildResponse(option))];
    }

    return [buildResponse(field.field)];
  }

  if (field?.type === "record") {
    return { "{KEY}": buildResponse(field.field) };
  }

  if (field?.type === "object") {
    return field?.fields?.reduce(
      (obj, objField) => ({
        ...obj,
        [objField.name]: buildResponse(objField),
      }),
      {}
    );
  }

  if (field?.type === "oneOf") {
    return buildResponse(field.options[0]);
  }

  return "";
};

export const ApiResponseField = ({ field, collapsible }) => {
  const [collapsed, setCollapsed] = useState(!!collapsible);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    []
  );

  if (PRIMITIVE_TYPES.includes(field?.type)) {
    const enums =
      field.type === "string" && field.enum
        ? `*[${field.enum.join(" | ")}]*`
        : "";

    return (
      <div className={styles.field}>
        <ApiParamInfo
          param={{
            ...field,
            description: [enums, field.description].filter(Boolean).join(" "),
          }}
        />
      </div>
    );
  }

  if (field.type === "object") {
    return (
      <div className={styles.field}>
        <div className={styles.groupContainer}>
          {field.name &&
            (collapsible ? (
              <button
                type="button"
                className={styles.groupHeader}
                onClick={toggleCollapsed}>
                <ApiParamInfo param={field} />
              </button>
            ) : (
              <div className={styles.groupHeader}>
                <ApiParamInfo param={{ ...field, type: "" }} />
              </div>
            ))}

          {collapsed ? null : (
            <div className={styles.group}>
              {field.fields?.map((arrayField, index) => (
                <ApiResponseField key={index} field={arrayField} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (field.type === "array") {
    return (
      <div className={styles.field}>
        <div className={styles.groupContainer}>
          {field.name && (
            <div className={styles.groupHeader}>
              <ApiParamInfo param={field} />
            </div>
          )}

          <div className={styles.group}>
            <ApiResponseField field={field.field} />
          </div>
        </div>
      </div>
    );
  }

  if (field.type === "record") {
    return (
      <div className={styles.field}>
        <div className={styles.groupContainer}>
          {field.name && (
            <div className={styles.groupHeader}>
              <ApiParamInfo param={field} />
            </div>
          )}

          <div className={styles.group}>
            <ApiResponseField field={field.field} />
          </div>
        </div>
      </div>
    );
  }

  if (field.type === "oneOf") {
    return (
      <div className={styles.field}>
        <div className={styles.groupContainer}>
          {field.name && (
            <div className={styles.groupHeader}>
              <ApiParamInfo param={field} />
            </div>
          )}

          <div className={styles.group}>
            {field.options.map((fieldParam, index) => (
              <React.Fragment key={index}>
                {expandedIndex === index ? (
                  <div className={styles.groupHeader}>
                    {fieldParam.displayName ||
                      fieldParam.name ||
                      `Option ${index + 1}`}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(index)}
                    className={styles.groupHeader}>
                    {fieldParam.displayName ||
                      fieldParam.name ||
                      `Option ${index + 1}`}
                  </button>
                )}

                {expandedIndex === index && (
                  <ApiResponseField key={index} field={fieldParam} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
