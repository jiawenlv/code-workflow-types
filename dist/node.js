export var WorkflowNodeTypeEnum;
(function (WorkflowNodeTypeEnum) {
    WorkflowNodeTypeEnum["systemConfig"] = "systemConfig";
    WorkflowNodeTypeEnum["globalVariable"] = "globalVariable";
    WorkflowNodeTypeEnum["workflowStart"] = "workflowStart";
    WorkflowNodeTypeEnum["workflowEnd"] = "workflowEnd";
    WorkflowNodeTypeEnum["code"] = "code";
    WorkflowNodeTypeEnum["condition"] = "condition";
    WorkflowNodeTypeEnum["loop"] = "loop";
    WorkflowNodeTypeEnum["loopStart"] = "loopStart";
    WorkflowNodeTypeEnum["loopEnd"] = "loopEnd";
    WorkflowNodeTypeEnum["chatWithLLM"] = "chatWithLLM";
    WorkflowNodeTypeEnum["dbQuery"] = "dbQuery";
    WorkflowNodeTypeEnum["httpRequest"] = "httpRequest";
})(WorkflowNodeTypeEnum || (WorkflowNodeTypeEnum = {}));
export var WorklowNodeStatusEnum;
(function (WorklowNodeStatusEnum) {
    WorklowNodeStatusEnum["dev"] = "dev";
    WorklowNodeStatusEnum["running"] = "running";
    WorklowNodeStatusEnum["success"] = "success";
    WorklowNodeStatusEnum["error"] = "error";
})(WorklowNodeStatusEnum || (WorklowNodeStatusEnum = {}));
