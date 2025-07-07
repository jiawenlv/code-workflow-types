import { exampleStartNodeDSL } from "./dsl.schema";

export const getStartNodePrompt = () => {
  return `# 工作流开始节点 (Start Node)

## 功能说明
工作流开始节点，定义工作流的输入参数和触发方式，作为工作流的起始点。

## inputs 输入参数
用户自由配置，作为工作流的初始输入数据，所有工作流的输入参数都在该节点定义

## outputs 输出参数
此节点类型不产生输出数据

## configs 配置参数
此节点类型无需特殊配置

## 配置示例
\`\`\`json
${JSON.stringify(exampleStartNodeDSL, null, 4)}
\`\`\`
`;
}; 