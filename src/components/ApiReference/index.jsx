import React, { useState, useCallback, useMemo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Formik, Form } from "formik";
import CodeBlock from "@theme/CodeBlock";
import qs from "qs";
import styles from "./styles.module.css";
import ApiResponseField, { buildResponse } from "./ApiResponseField";
import ApiParamField, { apiParamInitialValue } from "./ApiParamField";
import ApiParamButton from "./ApiParamButton";
import ApiExamples, { stringifyJSON, filterOutEmpty } from "./ApiExamples";
import { ApiReferenceTokenContext } from "./ApiReferenceToken";
import { InputKey } from "../APIComponent/APIRightPart";

const deepCompact = (value) => {
  if (Array.isArray(value)) {
    const array = value.map(deepCompact).filter((x) => x != null);

    return array.length === 0 ? undefined : array;
  }

  if (typeof value === "object" && value !== null) {
    const object = Object.fromEntries(
      Object.entries(value)
        .map(([key, value]) => [key, deepCompact(value)])
        .filter(([key, value]) => value != null)
    );

    return Object.keys(object).length === 0 ? undefined : object;
  }

  return value;
};

const ApiReference = ({
  description,
  method,
  path,
  pathParams,
  queryParams,
  bodyParam,
  responses,
  apiHost,
  codeSamples,
  children,
}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const { token, setToken } = useContext(ApiReferenceTokenContext);

  const handleResponseSelect = useCallback((event) => {
    setResponseIndex(+event.currentTarget.value);
  }, []);

  const execCallback = useCallback(
    async (values) => {
      setLoading(true);
      try {
        let pathReplace = path;

        // Replace path values (For example :address) in path
        for (const pathValue in values.path) {
          pathReplace = pathReplace.replace(
            `:${pathValue}`,
            values.path[pathValue]
          );
        }
        const response = await fetch(
          [
            apiHost,
            pathReplace,
            qs.stringify(values.query || {}, { addQueryPrefix: true }),
          ].join(""),
          {
            method,
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              "X-API-Key": `${token?.length > 0 ? token : "TEST"}`,
              Authorization: `Bearer ${token?.length > 0 ? token : "TEST"}`,
              "x-moralis-source": `api reference`,
              referer: "moralis.io",
            },
            body: JSON.stringify(filterOutEmpty(values.body)),
          }
        );

        const fetchBody = await response.json();

        const body = { status: response.status, body: fetchBody };

        setResponse(body);
        setResponseIndex(-1);
      } catch (error) {
        setResponse(null);
        setResponseIndex(-1);
      } finally {
        setLoading(false);
      }
    },
    [path, method, token]
  );

  const initialValues = useMemo(() => {
    const pathParam = pathParams && {
      type: "object",
      fields: pathParams,
    };
    const queryParam = queryParams && {
      type: "object",
      fields: queryParams,
    };
    return {
      path: pathParam && apiParamInitialValue(pathParam),
      query: queryParam && apiParamInitialValue(queryParam),
      body: bodyParam && apiParamInitialValue(bodyParam),
    };
  }, [bodyParam, pathParams, queryParams]);

  const onChangeToken = useCallback(
    (event) => setToken(event.currentTarget.value),
    [setToken]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={execCallback}>
      <Form autoComplete="off" className={styles.form}>
        <div className="row row--no-gutters">
          <div className="col">
            {/* API params: Method, host, path */}
            {/* <div className={styles.url}>
                <span className={styles.method}>{method}</span>
                {apiHost}
                {path}
              </div> */}

            {/* Description for the api */}
            {/* {description && (
                <div className={styles.section}>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              )} */}
            {/* TODO: not used */}
            {/* {pathParams && pathParams.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>PATH PARAMS</div>

                  <div className={styles.group}>
                    <ApiParamField
                      param={{ type: "object", fields: pathParams }}
                      prefix="path"
                    />
                  </div>
                </div>
              )} */}

            {/* Query Params */}
            {/* {queryParams && queryParams.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>QUERY PARAMS</div>

                  <div className={styles.group}>
                    <ApiParamField
                      param={{ type: "object", fields: queryParams }}
                      prefix="query"
                    />
                  </div>
                </div>
              )} */}

            {/* Body Params */}
            {/* {bodyParam && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>BODY PARAM</div>

                  <div className={styles.group}>
                    <ApiParamField param={bodyParam} prefix="body" />
                  </div>
                </div>
              )} */}

            {/* reponses args */}
            {/* <div className={styles.section}>
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
              </div> */}
            <div className={styles.section}>{children}</div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col col--5">
            <div className={styles.runner}>
              {/* API KEY INPUT */}
              <InputKey
                token={token}
                onChangeToken={onChangeToken}
                loading={loading}
              />

              {/* LANGUAGES TABS FOR API REQUESTING */}
              {/* <ApiExamples
                  method={method}
                  apiHost={apiHost}
                  path={path}
                  codeSamples={codeSamples}
                /> */}

              <div className={styles.section}>
                {/* RESPONSE EXAMPLE SELECTOR */}
                {/* <div className={styles.inlineForm}>
                    <div className={styles.sectionTitle}>
                      Response {responseIndex !== -1 && "Example"}
                    </div>
                    <select
                      value={responseIndex}
                      className={styles.input}
                      onChange={handleResponseSelect}
                    >
                      {responseIndex === -1 && (
                        <option disabled value={-1}>
                          {response?.status} Test Request
                        </option>
                      )}

                      {responses.map((response, index) => (
                        <option key={index} value={index}>
                          {response.status} {response.description}
                        </option>
                      ))}
                    </select>
                  </div> */}

                {/* CODE BLOCK FOR RESPONSE EXAMPLE */}
                {/* <CodeBlock className="language-json">
                    {responseIndex === -1
                      ? response
                        ? JSON.stringify(response.body, null, 2)
                        : "Fetch response error"
                      : responses[responseIndex].body
                      ? stringifyJSON(
                          deepCompact(
                            buildResponse(responses[responseIndex].body)
                          ),
                          true
                        )
                      : "Empty"}
                  </CodeBlock> */}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ApiReference;
