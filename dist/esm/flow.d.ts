export interface WorkflowRuntimeContext {
    nodeInputs: Record<string, Record<string, any>>;
    nodeOutputs: Record<string, Record<string, any>>;
    nodeStatus: Record<string, WorkflowRuntimeStatusEnum>;
    inputs?: Record<string, any>;
    outputs?: Record<string, any>;
    results?: Record<string, any>;
    output: Output;
}
export declare enum WorkflowRuntimeStatusEnum {
    pending = "pending",
    running = "running",
    success = "success",
    failed = "failed"
}
export interface Output {
    text?: (text: string) => void;
    json?: (json: WorkflowOutputJSON) => void;
}
export declare enum WorkflowOutputTypeEnum {
    WorkflowStart = "WorkflowStart",
    NodeStart = "NodeStart",
    NodeSuccess = "NodeSuccess",
    NodeError = "NodeError",
    WorkflowError = "WorkflowError",
    WorkflowComplete = "WorkflowComplete"
}
export interface WorkflowOutputJSON {
    type: WorkflowOutputTypeEnum;
    content: any;
}
