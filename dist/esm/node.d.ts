import { WorkflowCondition, WorkflowNodeInputField } from "./node-field";
export interface ReactFlowNodeConfig<T = any> {
    id: string;
    type: WorkflowNodeTypeEnum;
    data: T;
    position: {
        x: number;
        y: number;
    };
    measured?: {
        width: number;
        height: number;
    };
    isError?: boolean;
    selected?: boolean;
    dragging?: boolean;
}
export declare enum WorkflowNodeTypeEnum {
    workflowStart = "workflowStart",
    workflowEnd = "workflowEnd",
    code = "code",
    condition = "condition",
    chatWithLLM = "chatWithLLM",
    dbQuery = "dbQuery",
    httpRequest = "httpRequest",
    preview = "preview"
}
export type WorkflowData = {
    label: string;
    showInputs: boolean;
    showOutputs: boolean;
    hasCustomHandle?: boolean;
    inputs?: WorkflowNodeInputField[];
    outputs?: WorkflowNodeInputField[];
    conditions?: WorkflowCondition[];
    [key: string]: any;
};
export type WorkflowNode = ReactFlowNodeConfig<WorkflowData>;
export declare enum WorklowNodeStatusEnum {
    dev = "dev",
    running = "running",
    success = "success",
    error = "error"
}
export type DBNodeData = {};
