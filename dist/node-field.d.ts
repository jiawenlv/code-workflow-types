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
}
export declare enum WorkflowConditionOperatorEnum {
    equal = "equal",
    notEqual = "notEqual",
    greaterThan = "greaterThan",
    greaterThanEqual = "greaterThanEqual",
    lessThan = "lessThan",
    lessThanEqual = "lessThanEqual",
    isNull = "isNull",
    isNotNull = "isNotNull",
    include = "include",
    notInclude = "notInclude"
}
export declare enum WorkflowIOValueTypeEnum {
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
    httpRequestOptions = "httpRequestOptions"
}
export type WorkflowNodeInputField = WorkflowNodeIOFieldBase & {};
export type WorkflowNodeOuputField = WorkflowNodeIOFieldBase & {};
export interface WorkflowCondition {
    relationship: WorkflowConditionRelationshipEnum;
    conditions: WorkflowConditionItem[];
}
export declare enum WorkflowConditionRelationshipEnum {
    AND = "AND",
    OR = "OR"
}
export declare const WorkflowConditionRelationshipOptions: {
    label: string;
    value: WorkflowConditionRelationshipEnum;
}[];
export interface WorkflowConditionItem {
    left: WorkflowNodeIOFieldBase;
    operator: WorkflowConditionOperatorEnum;
    right: WorkflowNodeIOFieldBase;
}
export declare const WorkflowConditionOperatorOptions: {
    label: string;
    value: WorkflowConditionOperatorEnum;
}[];
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
    queryParams?: HTTPRequestConfigParam[];
    headers?: HTTPRequestConfigParam[];
    bodyType?: "none" | "form-data" | "x-www-form-urlencoded" | "json" | "xml" | "raw-text";
    body?: string | HTTPRequestConfigParam[];
}
