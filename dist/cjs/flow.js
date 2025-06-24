"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowOutputTypeEnum = exports.WorkflowRuntimeStatusEnum = void 0;
var WorkflowRuntimeStatusEnum;
(function (WorkflowRuntimeStatusEnum) {
    WorkflowRuntimeStatusEnum["pending"] = "pending";
    WorkflowRuntimeStatusEnum["running"] = "running";
    WorkflowRuntimeStatusEnum["success"] = "success";
    WorkflowRuntimeStatusEnum["failed"] = "failed";
})(WorkflowRuntimeStatusEnum || (exports.WorkflowRuntimeStatusEnum = WorkflowRuntimeStatusEnum = {}));
var WorkflowOutputTypeEnum;
(function (WorkflowOutputTypeEnum) {
    WorkflowOutputTypeEnum["WorkflowStart"] = "WorkflowStart";
    WorkflowOutputTypeEnum["NodeStart"] = "NodeStart";
    WorkflowOutputTypeEnum["NodeSuccess"] = "NodeSuccess";
    WorkflowOutputTypeEnum["NodeError"] = "NodeError";
    WorkflowOutputTypeEnum["WorkflowError"] = "WorkflowError";
    WorkflowOutputTypeEnum["WorkflowComplete"] = "WorkflowComplete";
})(WorkflowOutputTypeEnum || (exports.WorkflowOutputTypeEnum = WorkflowOutputTypeEnum = {}));
