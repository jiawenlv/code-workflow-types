import { exampleLLMNodeDSL } from './dsl.schema';

// LLM chat node prompt template
export const llmNodePrompt = `
# LLM对话节点 (ChatWithLLM Node)

## 功能说明
此节点用于与大型语言模型进行交互，支持多种模型参数配置和对话管理。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
LLM节点固定返回以下字段：
- **thinking**: AI思考过程（字符串类型）
- **response**: AI生成的回复（字符串类型）
- **tokens**: Token使用情况（对象类型）

## configs 配置参数
节点特定的配置参数，详见下方配置参数部分

## 配置参数

### 基本配置
- **modelId**: 使用的模型ID *(必填)*
- **systemPrompt**: 系统提示词，定义AI的角色和行为 *(可选)*
- **temperature**: 温度参数 (0-2)，控制生成的随机性 *(可选)*
- **maxTokens**: 最大token数，限制响应长度 *(可选)*
- **topP**: Top-p参数 (0-1)，控制词汇选择范围 *(可选)*
- **frequencyPenalty**: 频率惩罚 (-2到2)，减少重复内容 *(可选)*
- **presencePenalty**: 存在惩罚 (-2到2)，鼓励话题多样性 *(可选)*

## 配置示例
\`\`\`json
{
  "modelId": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 1000,
  "topP": 0.9,
  "frequencyPenalty": 0,
  "presencePenalty": 0,
  "systemPrompt": "你是一个有用的AI助手。"
}
\`\`\`

## 输入数据
- **userInput**: 用户输入内容，可以是字符串或消息数组

## 输出结果说明
- **thinking**: AI的思考过程和推理步骤
- **response**: AI最终生成的回复内容
- **tokens**: Token统计信息，包含输入、输出和总计token数

## 变量引用
在配置中可以使用 JSON Path 格式引用数据：
- \`$.节点名.inputs.字段名\` - 引用当前节点输入参数
- \`$.节点名.outputs.字段名\` - 引用其他节点输出

## 参数说明

### 温度 (Temperature)
- 0: 确定性输出，始终选择最可能的词
- 1: 平衡创造性和一致性
- 2: 高创造性，输出更加随机

### Top-P
- 0.1: 保守选择，输出更稳定
- 0.9: 标准设置，平衡多样性
- 1.0: 考虑所有可能的词汇

## 注意事项
1. 合理设置maxTokens以控制成本
2. systemPrompt对输出质量影响很大
3. 不同模型支持的参数可能有差异
4. 敏感信息不要包含在prompt中
5. 建议先测试参数组合的效果
`;

export const getLLMNodePrompt = () => {
  return llmNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleLLMNodeDSL, null, 2)}
\`\`\`
`;
}; 