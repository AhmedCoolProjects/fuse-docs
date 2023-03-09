import React from "react";
import ApiParamField from "./ApiParamField";
import styles from "./styles.module.css";

export function QueryParams({ queryParams, prefix, type }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>QUERY PARAMS</div>

      <div className={styles.group}>
        <ApiParamField
          param={{ type: type, fields: queryParams }}
          prefix={prefix}
        />
      </div>
    </div>
  );
}
