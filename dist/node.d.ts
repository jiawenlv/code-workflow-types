import { WorkflowCondition, WorkflowNodeInputField } from "./node-field";
export interface ReactFlowNodeConfig {
    id: string;
    type: WorkflowNodeTypeEnum;
    data: WorkflowData;
    position: {
        x: number;
        y: number;
    };
    isError?: boolean;
    isFolded?: boolean;
    isSelected?: boolean;
    status?: WorklowNodeStatusEnum;
}
export declare enum WorkflowNodeTypeEnum {
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
    dbQuery = "dbQuery",
    httpRequest = "httpRequest"
}
export interface WorkflowData {
    label: string;
    showInputs: boolean;
    showOutputs: boolean;
    hasCustomHandle?: boolean;
    inputs?: WorkflowNodeInputField[];
    outputs?: WorkflowNodeInputField[];
    conditions?: WorkflowCondition[];
    [key: string]: any;
}
export declare enum WorklowNodeStatusEnum {
    dev = "dev",
    running = "running",
    success = "success",
    error = "error"
}
