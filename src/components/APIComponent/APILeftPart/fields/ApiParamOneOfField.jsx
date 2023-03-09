import React, { useState, useCallback, useEffect } from "react";
import { useFormikContext } from "formik";
import { isPlainObject } from "lodash";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import styles from "../styles.module.css";
import {
  APIParamField,
  ApiParamInfo,
  apiParamInitialValue,
  buildParamPath,
} from "./ApiParamInfo";

export const ApiParamOneOfField = ({ param, field }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setFieldValue } = useFormikContext();
  const selectOption = useCallback(
    (index) => {
      setActiveIndex(index);

      const oldValues = apiParamInitialValue(param.options[activeIndex]);
      const newValues = apiParamInitialValue(param.options[index]);

      const setFieldValues = (values, clear = false) => {
        if (isPlainObject(values)) {
          if (Object.keys(values).length === 0) {
            setFieldValue(buildParamPath(field.name), undefined);
          } else {
            Object.entries(values).forEach(([key, value]) => {
              setFieldValue(
                buildParamPath(key, field.name),
                clear ? undefined : value
              );
            });
          }
        } else {
          setFieldValue(buildParamPath(field.name), clear ? undefined : values);
        }
      };

      setFieldValues(oldValues, true);
      setFieldValues(newValues);
    },
    [field.name, activeIndex, setFieldValue, param.options]
  );

  useEffect(() => selectOption(0), []);

  return (
    <div className={styles.groupContainer}>
      {param.name && (
        <div className={styles.groupHeader}>
          <ApiParamInfo param={param} />
        </div>
      )}

      <div className={styles.group}>
        {param.options?.map((fieldParam, index) => (
          <React.Fragment key={index}>
            <button
              type="button"
              onClick={() =>
                selectOption(
                  activeIndex === index
                    ? (index + 1) % param.options.length
                    : index
                )
              }
              className={styles.groupHeader}>
              {activeIndex === index ? <MdExpandLess /> : <MdExpandMore />}{" "}
              {fieldParam.displayName ||
                fieldParam.name ||
                `Option ${index + 1}`}
            </button>

            {activeIndex === index && (
              <APIParamField param={fieldParam} prefix={field.name} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
