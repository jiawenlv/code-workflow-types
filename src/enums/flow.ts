export enum WorkflowRuntimeStatusEnum {
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