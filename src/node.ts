import { WorkflowCondition, WorkflowNodeInputField } from "./node-field";

export interface ReactFlowNodeConfig<T=any> {
  // 节点 id
  id: string;

  // 节点类型
  type: WorkflowNodeTypeEnum;

  // 节点数据
  data: T

  // 位置
  position: {
    // 横坐标
    x: number;
    // 纵坐标
    y: number;
  };

  measured?: {
    // 宽度
    width: number,
    // 高度
    height: number
  },

  // 是否有错误
  isError?: boolean;

  // 是否选中
  selected?: boolean;

  // 是否处于拖动状态
  dragging?: boolean;
}

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
  preview="preview"
}


export type WorkflowData = {
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

export type WorkflowNode = ReactFlowNodeConfig<WorkflowData>;

export enum WorklowNodeStatusEnum {
  dev = "dev",
  running = "running",
  success = "success",
  error = "error",
}

export type DBNodeData = {

}