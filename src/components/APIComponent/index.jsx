import React, { useState, useCallback, useMemo, useContext } from "react";
import { Formik, Form } from "formik";
import qs from "qs";
import styles from "./styles.module.css";
import { InputKey, LanguagesTabs, ResponseExample } from "./APIRightPart";
import {
  APIInfos,
  BodyParams,
  QueryParams,
  ResponseParams,
} from "./APILeftPart";
import { apiParamInitialValue } from "./APILeftPart/fields";
import { ApiReferenceTokenContext } from "./context/ReferenceToken";

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

const APIComponent = ({
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
            {/* API Infos */}
            <APIInfos
              method={method}
              description={description}
              apiHost={apiHost}
              path={path}
            />
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
            {queryParams && queryParams.length > 0 && (
              <QueryParams
                queryParams={queryParams}
                type="object"
                prefix="query"
              />
            )}
            {/* Body Params */}
            {bodyParam && <BodyParams bodyParam={bodyParam} />}
            {/* response args */}
            <ResponseParams response={response} responses={responses} />
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
              <LanguagesTabs
                method={method}
                apiHost={apiHost}
                path={path}
                codeSamples={codeSamples}
              />
              {/* RESPONSE EXAMPLE */}
              <ResponseExample
                responseIndex={responseIndex}
                response={response}
                responses={responses}
                handleResponseSelect={handleResponseSelect}
              />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default APIComponent;
