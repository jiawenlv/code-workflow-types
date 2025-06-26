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

export enum WorkflowConditionRelationshipEnum {
    AND = "AND",
    OR = "OR",
  }