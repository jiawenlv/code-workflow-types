import { WorkflowCondition, WorkflowNodeInputField } from "./node-field";

export interface ReactFlowNodeConfig {
  // 节点 id
  id: string;

  // 节点类型
  type: WorkflowNodeTypeEnum;

  // 节点数据
  data: WorkflowData;

  // 位置
  position: {
    // 横坐标
    x: number;
    // 纵坐标
    y: number;
  };

  // 是否有错误
  isError?: boolean;

  // 是否折叠
  isFolded?: boolean;

  // 是否选中
  isSelected?: boolean;

  // 节点状态
  status?: WorklowNodeStatusEnum;
}

export enum WorkflowNodeTypeEnum {
  systemConfig = "systemConfig",
  globalVariable = "globalVariable",
  workflowStart = "workflowStart",
  workflowEnd = "workflowEnd",
  code = "code",
  condition = "condition",
  loop = "loop",
  loopStart = "loopStart",
  loopEnd = "loopEnd",
  chatWithLLM = "chatWithLLM",
  dbQuery = 'dbQuery',
  httpRequest = 'httpRequest',
}


export interface WorkflowData {
  // 节点标签
  label: string;
  showInputs: boolean;
  showOutputs: boolean;

  // 是否自定义 handle
  hasCustomHandle?: boolean;
  // 节点输入
  inputs?: WorkflowNodeInputField[];
  // 节点输出
  outputs?: WorkflowNodeInputField[];
  // 条件判断
  conditions?: WorkflowCondition[];
  // 其他配置
  [key: string]: any;
}

export enum WorklowNodeStatusEnum {
  dev = "dev",
  running = "running",
  success = "success",
  error = "error",
}
