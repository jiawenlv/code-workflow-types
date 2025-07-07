import { exampleSubWorkflowNodeDSL } from './dsl.schema';

// 工作流信息接口
export interface SubWorkflowInfo {
  id: string;
  name: string;
  version: string;
  desc: string;
  inputs: Record<string, { type: string; desc?: string }>;
  outputs: Record<string, { type: string; desc?: string }>;
  tags?: string[];
}

// 基础提示词模板
export const subWorkflowNodePrompt = `
# 工作流节点 (Workflow Node)

## 功能说明
调用其他已定义的工作流，实现工作流复用和组合。

## configs 配置参数

### 基本配置
- **workflowId**: 目标工作流ID *(必填)*
- **version**: 工作流版本，默认latest *(可选)*

### 参数映射
- **inputMappings**: 输入参数映射 *(必填)*
  - sourceField: 数据来源，如 \`$.PrevNode.outputs.data\`
  - targetField: 目标工作流输入字段名
  - desc: 映射说明
- **outputMappings**: 输出参数映射 *(必填)*
  - sourceField: 子工作流输出字段名
  - targetField: 当前节点输出字段名
  - desc: 映射说明

### 执行控制 *(可选)*
- **maxDepth**: 最大嵌套深度，默认3，最大5
- **timeout**: 执行超时时间（秒）
- **allowFailure**: 子工作流失败是否继续，默认false
- **retryCount**: 重试次数，0-3次，默认0

## 配置示例
\`\`\`json
{
  "workflowId": "order-processing",
  "version": "1.0.0",
  "inputMappings": [
    {
      "sourceField": "$.ValidateOrder.outputs.orderData",
      "targetField": "orderInfo",
      "desc": "传递订单数据"
    }
  ],
  "outputMappings": [
    {
      "sourceField": "processedOrder",
      "targetField": "result",
      "desc": "获取处理结果"
    }
  ],
  "timeout": 60,
  "retryCount": 2
}
\`\`\`

## 输出字段
节点执行后自动生成：
- **自定义字段**: 根据outputMappings动态生成
- **executionStatus**: 执行状态(success/failed/timeout)
- **executionTime**: 执行耗时(毫秒)
- **executionMetadata**: 执行详情

`;

// 动态生成包含所有可用工作流信息的提示词
export const getSubWorkflowNodePrompt = (availableWorkflows: SubWorkflowInfo[] = []) => {
  let prompt = subWorkflowNodePrompt;
  
  if (availableWorkflows.length > 0) {
    prompt += `
## 可用工作流列表

以下是当前系统中可以调用的工作流：

`;
    
    availableWorkflows.forEach(workflow => {
      prompt += `### ${workflow.name} (ID: ${workflow.id})
**版本**: ${workflow.version}
**描述**: ${workflow.desc}

**输入参数**:
`;
      Object.entries(workflow.inputs).forEach(([key, field]) => {
        prompt += `- **${key}** (${field.type}): ${field.desc || '无描述'}\n`;
      });

      prompt += `
**输出参数**:
`;
      Object.entries(workflow.outputs).forEach(([key, field]) => {
        prompt += `- **${key}** (${field.type}): ${field.desc || '无描述'}\n`;
      });

      if (workflow.tags && workflow.tags.length > 0) {
        prompt += `**标签**: ${workflow.tags.join(', ')}\n`;
      }
      
      prompt += '\n---\n\n';
    });
  } else {
    prompt += `
## 工作流列表
当前系统中暂无可用的工作流，请先创建其他工作流后再使用此节点。

`;
  }

  prompt += `
## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleSubWorkflowNodeDSL, null, 2)}
\`\`\`
`;

  return prompt;
};

// 获取工作流推荐
export const getSubWorkflowRecommendations = (
  currentInputs: string[], 
  availableWorkflows: SubWorkflowInfo[]
): SubWorkflowInfo[] => {
  // 基于输入参数匹配推荐合适的工作流
  return availableWorkflows.filter(workflow => {
    const workflowInputs = Object.keys(workflow.inputs);
    // 简单的匹配逻辑：如果有50%以上的参数匹配就推荐
    const matchCount = currentInputs.filter(input => 
      workflowInputs.some(wInput => 
        input.toLowerCase().includes(wInput.toLowerCase()) ||
        wInput.toLowerCase().includes(input.toLowerCase())
      )
    ).length;
    
    return matchCount / Math.max(currentInputs.length, workflowInputs.length) > 0.3;
  });
};