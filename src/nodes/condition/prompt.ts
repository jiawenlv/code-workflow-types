import { exampleConditionNodeDSL } from './dsl.schema';

// Condition node prompt template
export const conditionNodePrompt = `
# 条件判断节点 (Condition Node)

## 功能说明
此节点用于根据输入数据执行条件判断，决定工作流的下一步执行路径。支持复杂的条件逻辑组合。

## inputs 输入参数
用户自由配置，通常包含需要进行条件判断的数据字段

## outputs 输出参数
条件节点不产生数据输出，其作用是控制工作流的执行路径

## configs 配置参数
条件组配置，包括判断逻辑、操作符、期望值和跳转目标

## 配置参数

### 基本配置
- **conditionGroups**: 条件组列表 *(必填)*
- **groupRelationship**: 条件组之间的逻辑关系 (AND/OR) *(可选)*
- **defaultNextNode**: 默认跳转节点 *(可选)*

### 条件组配置 (conditionGroups)
- **conditions**: 单个条件组内的条件列表 *(必填)*
- **relationship**: 条件组内的逻辑关系 (AND/OR) *(必填)*
- **nextNode**: 条件满足时跳转的节点ID *(必填)*

### 单个条件配置
- **left**: 变量路径，如 "$.ConditionNode.inputs.userType" *(必填)*
- **operator**: 比较操作符 *(必填)*
- **right**: 期望值 *(必填)*

## 支持的操作符
- **equal** - 等于
- **notEqual** - 不等于
- **greaterThan** - 大于
- **greaterThanEqual** - 大于等于
- **lessThan** - 小于
- **lessThanEqual** - 小于等于
- **isNull** - 为空
- **isNotNull** - 不为空
- **include** - 包含
- **notInclude** - 不包含

## 核心要点
1. **顺序评估**：按顺序评估条件组，首个匹配的执行
2. **逻辑关系**：组内用relationship，组间用groupRelationship
3. **变量引用**：使用\`$.节点名.inputs.字段名\`格式
4. **默认分支**：设置defaultNextNode处理未匹配情况

## 配置示例
\`\`\`json
{
  "conditionGroups": [{
    "conditions": [{
      "left": "$.CheckUser.inputs.userType",
      "operator": "equal", 
      "right": "vip"
    }],
    "relationship": "AND",
    "nextNode": "VipProcess"
  }],
  "defaultNextNode": "NormalProcess"
}
\`\`\`
`;

export const getConditionNodePrompt = () => {
  return conditionNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleConditionNodeDSL, null, 2)}
\`\`\`
`;
}; 