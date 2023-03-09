import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";

export function APIInfos({ method, apiHost, path, description }) {
  return (
    <>
      <div className={styles.url}>
        <span className={styles.method}>{method}</span>
        {apiHost}
        {path}
      </div>
      {description && (
        <div className={styles.section}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
    </>
  );
}
