import React from "react";
import { Field } from "formik";
import { ApiParamInfo, buildParamPath, validateField } from "./fields";
import { PRIMITIVE_TYPES } from "./_consts";
import { apiParamComponents } from "./_const_comps";

import styles from "./styles.module.css";

const ApiParamField = ({ prefix, param }) => {
  const Component = apiParamComponents[param.type];
  const field = (
    <Field name={buildParamPath(param, prefix)} validate={validateField(param)}>
      {(props) => <Component {...props} param={param} />}
    </Field>
  );

  return (
    <div className={styles.field}>
      {PRIMITIVE_TYPES.includes(param.type) ? (
        <>
          <ApiParamInfo param={param} />

          <div className={styles.fieldInput}>{field}</div>
        </>
      ) : (
        field
      )}
    </div>
  );
};

export default ApiParamField;
