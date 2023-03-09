import React from "react";
import { ApiResponseField } from "./fields";
import styles from "./styles.module.css";

export function ResponseParams({ responses, response }) {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Responses</div>

        {responses &&
          responses?.map((response, index) => (
            <div key={index} className={styles.section}>
              <div className={styles.group}>
                <ApiResponseField
                  collapsible
                  field={{
                    type: "object",
                    name: `${response.status} ${response.description}`,
                    ...response.body,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
