import {
  ApiParamArrayField,
  ApiParamBooleanField,
  ApiParamJSONField,
  ApiParamNumberField,
  ApiParamOneOfField,
  ApiParamRecordField,
  ApiParamTextField,
} from "./fields";
import ApiParamObjectField from "./fields/ApiParamObjectField";

export const apiParamComponents = {
  string: ApiParamTextField,
  number: ApiParamNumberField,
  boolean: ApiParamBooleanField,
  json: ApiParamJSONField,
  array: ApiParamArrayField,
  record: ApiParamRecordField,
  object: ApiParamObjectField,
  oneOf: ApiParamOneOfField,
};
