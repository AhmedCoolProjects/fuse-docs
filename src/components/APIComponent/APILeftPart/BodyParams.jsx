import React from "react";
import ApiParamField from "./ApiParamField";
import styles from "./styles.module.css";

export function BodyParams({ bodyParam }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>BODY PARAM</div>

      <div className={styles.group}>
        <ApiParamField param={bodyParam} prefix="body" />
      </div>
    </div>
  );
}
