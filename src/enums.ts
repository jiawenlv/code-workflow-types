// 节点类型常量对象（替代 enum）
export enum NodeTypeEnum {
  // 工作流控制节点
  WORKFLOW_START = "workflowStart",
  WORKFLOW_END = "workflowEnd",

  // 数据库操作节点
  DB_QUERY = "dbQuery",
  DB_CREATE = "dbCreate",
  DB_UPDATE = "dbUpdate",
  DB_DELETE = "dbDelete",

  // 控制流节点
  CONDITION = "condition",
  TRANSACTION = "transaction",

  // 外部集成节点
  HTTP = "http",
  LLM = "llm",

  // 处理节点
  CODE = "code",
  BATCH = "batch",

  // 工作流组合节点
  WORKFLOW = "workflow"
}

// 字段类型常量对象（替代 enum）
export const FieldTypeEnum = {
  // 基础数据类型
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  OBJECT: "object",
  ARRAY: "array",
  ANY: "any",

  // 特殊UI类型
  LONG_TEXT: "longText",
  PASSWORD: "password",
  CODE_FILE: "codeFile",

  // 业务特定类型
  MODEL_ID: "modelId",
  DB_TABLE_NAME: "dbTableName",
  HTTP_REQUEST_OPTIONS: "httpRequestOptions",
  DEPENDENCIES: "dependencies",

  // 扩展类型
  FILE: "file",
  STRING_WITH_LLM: "stringWithLLM"
} as const;

// HTTP 方法枚举
export const HttpMethodEnum = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS"
} as const;

// 批处理聚合策略枚举
export const BatchAggregationStrategyEnum = {
  SUM: "sum",
  COUNT: "count",
  COLLECT: "collect",
  FIRST: "first",
  LAST: "last",
  MAX: "max",
  MIN: "min"
} as const;

// 条件操作符枚举
export const ConditionOperatorEnum = {
  EQUAL: "equal",
  NOT_EQUAL: "notEqual",
  GREATER_THAN: "greaterThan",
  GREATER_THAN_EQUAL: "greaterThanEqual",
  LESS_THAN: "lessThan",
  LESS_THAN_EQUAL: "lessThanEqual",
  IS_NULL: "isNull",
  IS_NOT_NULL: "isNotNull",
  INCLUDE: "include",
  NOT_INCLUDE: "notInclude"
} as const;

// 事务隔离级别枚举
export const TransactionIsolationEnum = {
  READ_UNCOMMITTED: "READ_UNCOMMITTED",
  READ_COMMITTED: "READ_COMMITTED",
  REPEATABLE_READ: "REPEATABLE_READ",
  SERIALIZABLE: "SERIALIZABLE"
} as const;

// 工作流执行状态枚举
export const WorkflowExecutionStatusEnum = {
  SUCCESS: "success",
  FAILED: "failed",
  TIMEOUT: "timeout",
  PENDING: "pending",
  RUNNING: "running"
} as const;

// 导出枚举值数组（用于 zod 验证）
export const NODE_TYPE_VALUES = Object.values(NodeTypeEnum) as [string, ...string[]];
export const FIELD_TYPE_VALUES = Object.values(FieldTypeEnum) as [string, ...string[]];
export const HTTP_METHOD_VALUES = Object.values(HttpMethodEnum) as [string, ...string[]];
export const BATCH_AGGREGATION_STRATEGY_VALUES = Object.values(BatchAggregationStrategyEnum) as [string, ...string[]];
export const CONDITION_OPERATOR_VALUES = Object.values(ConditionOperatorEnum) as [string, ...string[]];
export const TRANSACTION_ISOLATION_VALUES = Object.values(TransactionIsolationEnum) as [string, ...string[]];
export const WORKFLOW_EXECUTION_STATUS_VALUES = Object.values(WorkflowExecutionStatusEnum) as [string, ...string[]];

// 类型导出
export type NodeType = typeof NodeTypeEnum[keyof typeof NodeTypeEnum];
export type FieldType = typeof FieldTypeEnum[keyof typeof FieldTypeEnum];
export type HttpMethod = typeof HttpMethodEnum[keyof typeof HttpMethodEnum];
export type BatchAggregationStrategy = typeof BatchAggregationStrategyEnum[keyof typeof BatchAggregationStrategyEnum];
export type ConditionOperator = typeof ConditionOperatorEnum[keyof typeof ConditionOperatorEnum];
export type TransactionIsolation = typeof TransactionIsolationEnum[keyof typeof TransactionIsolationEnum];
export type WorkflowExecutionStatus = typeof WorkflowExecutionStatusEnum[keyof typeof WorkflowExecutionStatusEnum];

// TODO
export enum WorkflowRuntimeStatusEnum {
  validateError = "validateError",
  pending = "pending",
  running = "running",
  success = "success",
  failed = "failed",
}

export enum WorkflowOutputTypeEnum {
  WorkflowStart = 'WorkflowStart',
  NodeStart = 'NodeStart',
  NodeSuccess = 'NodeSuccess',
  NodeError = 'NodeError',
  WorkflowError = 'WorkflowError',
  WorkflowComplete = 'WorkflowComplete',
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

export enum WorkflowConditionRelationshipEnum {
  AND = "AND",
  OR = "OR",
}

// TODO
export enum WorkflowNodeTypeEnum {
  // systemConfig = "systemConfig",
  // globalVariable = "globalVariable",
  workflowStart = "workflowStart",
  workflowEnd = "workflowEnd",
  code = "code",
  condition = "condition",
  // loop = "loop",
  // loopStart = "loopStart",
  // loopEnd = "loopEnd",
  chatWithLLM = "chatWithLLM",
  dbQuery = 'dbQuery',
  httpRequest = 'httpRequest',
  preview = "preview"
}

// TODO
export enum WorklowNodeStatusEnum {
  dev = "dev",
  running = "running",
  success = "success",
  error = "error",
}

