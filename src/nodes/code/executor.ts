import { CodeNode } from "./ui.schema";

export const executeCodeNode = async (nodeConfig: CodeNode) => {
    const { inputs } = nodeConfig.data;
    const script = inputs.find(input => input.attrName === "script")?.value;
    const path = inputs.find(input => input.attrName === "path")?.value;

    // TODO get absolute Path
    const theScript = await import(path)
    // TODO 解析安装依赖

    const result = theScript.default(script);
    return result;
}