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
    preview = "preview"
}

export enum WorklowNodeStatusEnum {
    dev = "dev",
    running = "running",
    success = "success",
    error = "error",
  }
  