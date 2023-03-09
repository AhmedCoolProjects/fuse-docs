import React, { useState, useCallback } from "react";
import clsx from "clsx";
import TextareaAutosize from "react-textarea-autosize";
import styles from "../styles.module.css";

export const ApiParamBaseInput = ({
  multiline,
  enum: options,
  field,
  meta,
  form,
  param,
  valueToString,
  stringToValue,
}) => {
  const [focused, setFocused] = useState(false);
  const inputClassName = clsx(styles.input, {
    [styles.invalid]: meta.touched && meta.error,
  });

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback((event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;

    setFocused(false);
  }, []);

  const handleChange = useCallback(
    (event) => {
      const value = event.currentTarget.value;

      form.setFieldValue(
        event.currentTarget.name,
        options
          ? options.find((option) => String(option) === value)
          : (stringToValue ? stringToValue(value) : value) || undefined
      );
    },
    [form, options, stringToValue]
  );

  const fieldProps = {
    ...field,
    value:
      field.value == null
        ? ""
        : valueToString
        ? valueToString(field.value)
        : String(field.value),
    onChange: handleChange,
  };

  return (
    <div
      tabIndex={-1}
      className={styles.inputContainer}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      {options ? (
        <select {...fieldProps} className={inputClassName}>
          <option />
          {options.map((option, index) => (
            <option key={index}>{String(option)}</option>
          ))}
        </select>
      ) : multiline ? (
        <TextareaAutosize {...fieldProps} className={inputClassName} />
      ) : (
        <input {...fieldProps} className={inputClassName} />
      )}
      {focused && (
        <ApiParamInputOverlay
          field={field}
          form={form}
          meta={meta}
          param={param}
        />
      )}
    </div>
  );
};

export const ApiParamInputOverlay = ({ field, meta, form, param }) => {
  const error = meta.touched && meta.error;
  const exampleValue = param.example;

  const setExampleValue = useCallback(
    (event) => {
      event.currentTarget.blur();

      form.setFieldValue(field.name, exampleValue);
    },
    [field.name, exampleValue, form]
  );

  if (!error && !exampleValue) return null;

  return (
    <div className={styles.inputOverlay}>
      {error && <div className={styles.inputOverlayError}>{error}</div>}
      {exampleValue && (
        <button
          type="button"
          className={styles.inputOverlayButton}
          onClick={setExampleValue}>
          Set Example Value
          <small>
            {typeof exampleValue === "object"
              ? JSON.stringify(exampleValue)
              : exampleValue}
          </small>
        </button>
      )}
    </div>
  );
};
