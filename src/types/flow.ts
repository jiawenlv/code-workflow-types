import { WorkflowOutputTypeEnum, WorkflowRuntimeStatusEnum } from "../enums/flow";

export interface WorkflowRuntimeContext {
  nodeInputs: Record<string, Record<string, any>>;
  nodeOutputs: Record<string, Record<string, any>>;
  nodeStatus: Record<string, WorkflowRuntimeStatusEnum>;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  results: Record<string, any>;
  outputChanel: Output
}



export interface Output {
  text?: (text: string) => void
  json?: (json: WorkflowOutputJSON) => void
}



export interface WorkflowOutputJSON {
  type: WorkflowOutputTypeEnum
  content: any
}