import React from "react";
import {
  APIParamField,
  ApiParamInfo,
  apiParamInitialValue,
} from "./ApiParamInfo";

import styles from "../styles.module.css";

export const ApiParamArrayField = ({ param, field, form }) => {
  return (
    <div className={styles.groupContainer}>
      {param.name && (
        <div className={styles.groupHeader}>
          <ApiParamInfo param={param} />
        </div>
      )}

      <div className={styles.group}>
        {[...field.value].map((value, index) => (
          <div key={index} className={styles.field}>
            <div className={styles.group}>
              <div className={styles.groupHeader}>
                <button
                  type="button"
                  onClick={() =>
                    form.setFieldValue(field.name, [
                      ...field.value.slice(0, index),
                      ...field.value.slice(index + 1),
                    ])
                  }>
                  -
                </button>{" "}
                {param.name}[{index}]
              </div>

              <APIParamField
                param={param.field}
                prefix={`${field.name}[${index}]`}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            form.setFieldValue(field.name, [
              ...field.value,
              apiParamInitialValue(param.field),
            ]);
          }}
          className={styles.groupHeader}>
          + ADD
        </button>
      </div>
    </div>
  );
};
