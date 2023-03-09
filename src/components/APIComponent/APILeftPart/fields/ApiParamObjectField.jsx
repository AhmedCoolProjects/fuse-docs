import React from "react";
import ApiParamField from "../ApiParamField";
import styles from "../styles.module.css";
import { ApiParamInfo } from "./ApiParamInfo";

function ApiParamObjectField({ param, field }) {
  return (
    <div className={styles.groupContainer}>
      {param.name && (
        <div className={styles.groupHeader}>
          <ApiParamInfo param={param} />
        </div>
      )}

      <div className={styles.group}>
        {param.fields?.map((fieldParam, index) => (
          <ApiParamField key={index} param={fieldParam} prefix={field.name} />
        ))}
      </div>
    </div>
  );
}

export default ApiParamObjectField;
