import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export function InputKey({ token, onChangeToken, loading }) {
  return (
    <div className={styles.inlineForm}>
      <div className={styles.sectionTitle}>API KEY</div>
      <input
        value={token}
        onChange={onChangeToken}
        placeholder="YOUR_API_KEY (Optional)"
        className={styles.input}
      />
      <ApiParamButton type="submit" disabled={loading}>
        Try It
      </ApiParamButton>
    </div>
  );
}

export const ApiParamButton = ({ className, ...props }) => {
  return <button {...props} className={clsx(className, styles.button)} />;
};
