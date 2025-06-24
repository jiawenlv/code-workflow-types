export var WorkflowNodeTypeEnum;
(function (WorkflowNodeTypeEnum) {
    // systemConfig = "systemConfig",
    // globalVariable = "globalVariable",
    WorkflowNodeTypeEnum["workflowStart"] = "workflowStart";
    WorkflowNodeTypeEnum["workflowEnd"] = "workflowEnd";
    WorkflowNodeTypeEnum["code"] = "code";
    WorkflowNodeTypeEnum["condition"] = "condition";
    // loop = "loop",
    // loopStart = "loopStart",
    // loopEnd = "loopEnd",
    WorkflowNodeTypeEnum["chatWithLLM"] = "chatWithLLM";
    WorkflowNodeTypeEnum["dbQuery"] = "dbQuery";
    WorkflowNodeTypeEnum["httpRequest"] = "httpRequest";
    WorkflowNodeTypeEnum["preview"] = "preview";
})(WorkflowNodeTypeEnum || (WorkflowNodeTypeEnum = {}));
export var WorklowNodeStatusEnum;
(function (WorklowNodeStatusEnum) {
    WorklowNodeStatusEnum["dev"] = "dev";
    WorklowNodeStatusEnum["running"] = "running";
    WorklowNodeStatusEnum["success"] = "success";
    WorklowNodeStatusEnum["error"] = "error";
})(WorklowNodeStatusEnum || (WorklowNodeStatusEnum = {}));
