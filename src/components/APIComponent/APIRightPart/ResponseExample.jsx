import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

const INDENT_LENGTH = 2;

export const PRIMITIVE_TYPES = ["string", "number", "boolean", "json"];

export const stringifyJSON = (obj, pretty = false) =>
  JSON.stringify(obj, null, pretty ? INDENT_LENGTH : undefined);

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

const deepCompact = (value) => {
  if (Array.isArray(value)) {
    const array = value.map(deepCompact).filter((x) => x != null);

    return array.length === 0 ? undefined : array;
  }

  if (typeof value === "object" && value !== null) {
    const object = Object.fromEntries(
      Object.entries(value)
        .map(([key, value]) => [key, deepCompact(value)])
        .filter(([key, value]) => value != null)
    );

    return Object.keys(object).length === 0 ? undefined : object;
  }

  return value;
};

export function ResponseExample({
  responseIndex,
  handleResponseSelect,
  response,
  responses,
}) {
  return (
    <div className={styles.section}>
      <div className={styles.inlineForm}>
        <div className={styles.sectionTitle}>
          Response {responseIndex !== -1 && "Example"}
        </div>
        <select
          value={responseIndex}
          className={styles.input}
          onChange={handleResponseSelect}>
          {responseIndex === -1 && (
            <option disabled value={-1}>
              {response?.status} Test Request
            </option>
          )}

          {responses.map((response, index) => (
            <option key={index} value={index}>
              {response.status} {response.description}
            </option>
          ))}
        </select>
      </div>
      <CodeBlock className="language-json">
        {responseIndex === -1
          ? response
            ? JSON.stringify(response.body, null, 2)
            : "Fetch response error"
          : responses[responseIndex].body
          ? stringifyJSON(
              deepCompact(buildResponse(responses[responseIndex].body)),
              true
            )
          : "Empty"}
      </CodeBlock>
    </div>
  );
}
