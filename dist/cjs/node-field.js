"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowConditionOperatorOptions = exports.WorkflowConditionRelationshipOptions = exports.WorkflowConditionRelationshipEnum = exports.WorkflowIOValueTypeEnum = exports.WorkflowConditionOperatorEnum = void 0;
var WorkflowConditionOperatorEnum;
(function (WorkflowConditionOperatorEnum) {
    WorkflowConditionOperatorEnum["equal"] = "equal";
    WorkflowConditionOperatorEnum["notEqual"] = "notEqual";
    WorkflowConditionOperatorEnum["greaterThan"] = "greaterThan";
    WorkflowConditionOperatorEnum["greaterThanEqual"] = "greaterThanEqual";
    WorkflowConditionOperatorEnum["lessThan"] = "lessThan";
    WorkflowConditionOperatorEnum["lessThanEqual"] = "lessThanEqual";
    WorkflowConditionOperatorEnum["isNull"] = "isNull";
    WorkflowConditionOperatorEnum["isNotNull"] = "isNotNull";
    WorkflowConditionOperatorEnum["include"] = "include";
    WorkflowConditionOperatorEnum["notInclude"] = "notInclude";
})(WorkflowConditionOperatorEnum || (exports.WorkflowConditionOperatorEnum = WorkflowConditionOperatorEnum = {}));
var WorkflowIOValueTypeEnum;
(function (WorkflowIOValueTypeEnum) {
    WorkflowIOValueTypeEnum["string"] = "string";
    WorkflowIOValueTypeEnum["stringWithLLM"] = "string";
    WorkflowIOValueTypeEnum["number"] = "number";
    WorkflowIOValueTypeEnum["boolean"] = "boolean";
    WorkflowIOValueTypeEnum["object"] = "object";
    WorkflowIOValueTypeEnum["code"] = "code";
    WorkflowIOValueTypeEnum["arrayString"] = "arrayString";
    WorkflowIOValueTypeEnum["arrayNumber"] = "arrayNumber";
    WorkflowIOValueTypeEnum["arrayBoolean"] = "arrayBoolean";
    WorkflowIOValueTypeEnum["arrayObject"] = "arrayObject";
    WorkflowIOValueTypeEnum["arrayAny"] = "arrayAny";
    WorkflowIOValueTypeEnum["any"] = "any";
    WorkflowIOValueTypeEnum["chatHistory"] = "chatHistory";
    WorkflowIOValueTypeEnum["datasetQuote"] = "datasetQuote";
    WorkflowIOValueTypeEnum["dynamic"] = "dynamic";
    WorkflowIOValueTypeEnum["selectDataset"] = "selectDataset";
    WorkflowIOValueTypeEnum["selectApp"] = "selectApp";
    WorkflowIOValueTypeEnum["longText"] = "longText";
    WorkflowIOValueTypeEnum["modelId"] = "modelId";
    WorkflowIOValueTypeEnum["password"] = "password";
    WorkflowIOValueTypeEnum["httpRequestOptions"] = "httpRequestOptions";
    WorkflowIOValueTypeEnum["file"] = "file";
})(WorkflowIOValueTypeEnum || (exports.WorkflowIOValueTypeEnum = WorkflowIOValueTypeEnum = {}));
var WorkflowConditionRelationshipEnum;
(function (WorkflowConditionRelationshipEnum) {
    WorkflowConditionRelationshipEnum["AND"] = "AND";
    WorkflowConditionRelationshipEnum["OR"] = "OR";
})(WorkflowConditionRelationshipEnum || (exports.WorkflowConditionRelationshipEnum = WorkflowConditionRelationshipEnum = {}));
exports.WorkflowConditionRelationshipOptions = [
    { label: "同时满足", value: WorkflowConditionRelationshipEnum.AND },
    { label: "满足任一条件", value: WorkflowConditionRelationshipEnum.OR },
];
exports.WorkflowConditionOperatorOptions = [
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
