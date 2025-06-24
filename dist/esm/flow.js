export var WorkflowRuntimeStatusEnum;
(function (WorkflowRuntimeStatusEnum) {
    WorkflowRuntimeStatusEnum["pending"] = "pending";
    WorkflowRuntimeStatusEnum["running"] = "running";
    WorkflowRuntimeStatusEnum["success"] = "success";
    WorkflowRuntimeStatusEnum["failed"] = "failed";
})(WorkflowRuntimeStatusEnum || (WorkflowRuntimeStatusEnum = {}));
export var WorkflowOutputTypeEnum;
(function (WorkflowOutputTypeEnum) {
    WorkflowOutputTypeEnum["WorkflowStart"] = "WorkflowStart";
    WorkflowOutputTypeEnum["NodeStart"] = "NodeStart";
    WorkflowOutputTypeEnum["NodeSuccess"] = "NodeSuccess";
    WorkflowOutputTypeEnum["NodeError"] = "NodeError";
    WorkflowOutputTypeEnum["WorkflowError"] = "WorkflowError";
    WorkflowOutputTypeEnum["WorkflowComplete"] = "WorkflowComplete";
})(WorkflowOutputTypeEnum || (WorkflowOutputTypeEnum = {}));
