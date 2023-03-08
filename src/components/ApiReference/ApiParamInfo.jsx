import React from "react";
import Markdown from "markdown-to-jsx";
import styles from "./styles.module.css";


const ApiParamInfo = ({ param }) => (
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

export default ApiParamInfo;
