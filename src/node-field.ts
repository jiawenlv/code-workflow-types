export interface WorkflowNodeIOFieldBase {
  id: string;
  attrName: string;
  valueType: WorkflowIOValueTypeEnum;
  isDynamic: boolean;
  label: string;
  removable: boolean;
  editable: boolean;
  desc?: string;
  value?: any;
  valuePath?: string[];
  valueLabelPath?: string[];
  required?: boolean;
  defaultValue?: any;
}

export enum WorkflowConditionOperatorEnum {
  equal = "equal",
  notEqual = "notEqual",
  greaterThan = "greaterThan",
  greaterThanEqual = "greaterThanEqual",
  lessThan = "lessThan",
  lessThanEqual = "lessThanEqual",
  isNull = "isNull",
  isNotNull = "isNotNull",
  include = "include",
  notInclude = "notInclude",
}

export enum WorkflowIOValueTypeEnum {
  string = "string",
  stringWithLLM = "string",
  number = "number",
  boolean = "boolean",
  object = "object",
  code = "code",
  arrayString = "arrayString",
  arrayNumber = "arrayNumber",
  arrayBoolean = "arrayBoolean",
  arrayObject = "arrayObject",
  arrayAny = "arrayAny",
  any = "any",
  chatHistory = "chatHistory",
  datasetQuote = "datasetQuote",
  dynamic = "dynamic",
  selectDataset = "selectDataset",
  selectApp = "selectApp",
  longText = "longText",
  modelId = "modelId",
  password = "password",
  httpRequestOptions = "httpRequestOptions",
  file = "file"
}

export type WorkflowNodeInputField = WorkflowNodeIOFieldBase & {};

export type WorkflowNodeOuputField = WorkflowNodeIOFieldBase & {};

// TODO 这个是从 fastGPT 迁移过来的，需要重构

export interface WorkflowCondition {
  relationship: WorkflowConditionRelationshipEnum;
  conditions: WorkflowConditionItem[];
}

export enum WorkflowConditionRelationshipEnum {
  AND = "AND",
  OR = "OR",
}

export const WorkflowConditionRelationshipOptions = [
  { label: "同时满足", value: WorkflowConditionRelationshipEnum.AND },
  { label: "满足任一条件", value: WorkflowConditionRelationshipEnum.OR },
];

export interface WorkflowConditionItem {
  left: WorkflowNodeIOFieldBase;
  operator: WorkflowConditionOperatorEnum;
  right: WorkflowNodeIOFieldBase;
}

export const WorkflowConditionOperatorOptions = [
  { label: "等于", value: WorkflowConditionOperatorEnum.equal },
  { label: "不等于", value: WorkflowConditionOperatorEnum.notEqual },
  { label: "大于", value: WorkflowConditionOperatorEnum.greaterThan },
  { label: "大于等于", value: WorkflowConditionOperatorEnum.greaterThanEqual },
  { label: "小于", value: WorkflowConditionOperatorEnum.lessThan },
  { label: "小于等于", value: WorkflowConditionOperatorEnum.lessThanEqual },
  { label: "为空", value: WorkflowConditionOperatorEnum.isNull },
  { label: "不为空", value: WorkflowConditionOperatorEnum.isNotNull },
  { label: "包含", value: WorkflowConditionOperatorEnum.include },
  { label: "不包含", value: WorkflowConditionOperatorEnum.notInclude },
];

export type NodeInputsAndOutputs = {
  inputs?: Omit<WorkflowNodeInputField, "id">[];
  outputs?: Omit<WorkflowNodeOuputField, "id">[];
};

export interface HTTPRequestConfigParam {
  type: "const" | "dynamic";
  key: string;
  value: string;
  valuePath?: string[];
  valueLabelPath?: string[];
}

export interface HTTPRequestConfig {
  method: string;
  url: string;
  timeout?: number;
  params?: HTTPRequestConfigParam[];
  queryParams?: HTTPRequestConfigParam[]; // Add this line
  headers?: HTTPRequestConfigParam[];
  bodyType?: "none" | "form-data" | "x-www-form-urlencoded" | "json" | "xml" | "raw-text";
  body?: string | HTTPRequestConfigParam[];
}