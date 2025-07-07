import { exampleCodeNodeDSL } from './dsl.schema';

// Code execution node prompt template
export const codeNodePrompt = `# 代码执行节点 (Code Node)

## 功能说明
执行自定义JavaScript代码，支持NPM依赖库引入，**仅用于其他专业节点无法实现的复杂业务逻辑处理、数据转换和计算**。

## 重要使用限制
**Code节点应该是最后的选择，优先使用专业节点**：
- ❌ **数据库操作**：使用dbQuery、dbCreate、dbUpdate、dbDelete节点，不要用code节点
- ❌ **HTTP请求**：使用http节点，不要在code中使用fetch/axios
- ❌ **简单条件判断**：使用condition节点，不要用code节点
- ❌ **批量处理**：使用batch节点，不要在code中写循环
- ❌ **事务操作**：使用transaction节点，不要用code节点
- ❌ **LLM调用**：使用llm节点，不要在code中调用LLM API

## Code节点适用场景
**仅在以下情况使用code节点**：
1. **复杂数据转换**：专业节点无法完成的数据结构转换和格式化
2. **复杂业务计算**：涉及多个算法、公式计算的业务逻辑
3. **复杂条件逻辑**：condition节点无法表达的复杂条件判断
4. **数据聚合分析**：需要复杂统计分析的数据处理
5. **外部库依赖**：需要使用特定NPM包的功能

## 设计原则
1. **单一职责**：每个code节点只完成一个明确的功能
2. **功能独立**：避免在一个code节点中混合多种不同类型的处理逻辑
3. **最小化原则**：能用专业节点实现的功能绝不使用code节点

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据，每个字段将作为函数参数对象的属性传入

## outputs 输出参数  
用户自由配置，必须与函数返回值的结构完全一致，每个字段对应函数返回对象的同名属性

## configs 配置参数
- **file**: 代码文件配置 *(必填)*
  - **name**: 代码文件名(.js格式) *(必填)*
  - **content**: JavaScript代码内容 *(必填)*
- **dependencies**: NPM包依赖列表 *(可选)*

## 输入输出映射规范

### 1. 函数签名要求（强制约束）
\`\`\`javascript
export default function main(inputs) {
    // inputs 是包含所有节点输入字段的对象
    // 必须返回对象，字段名与节点outputs中定义的字段名完全一致
    return {
        // 返回值字段必须匹配 outputs 定义
    };
}
\`\`\`

**关键限制**：
- ✅ **必须使用 \`export default\`**：函数入口点必须是默认导出
- ✅ **函数名必须是 \`main\`**：固定的函数名称
- ✅ **必须返回对象**：不能返回基础类型（string、number、boolean等）
- ✅ **参数名必须是 \`inputs\`**：接收所有输入参数的对象

### 2. 输入参数映射
- 节点 \`inputs\` 中定义的每个字段，会作为函数 \`inputs\` 参数对象的属性
- 字段名必须完全一致，支持任意数据类型
- 示例：节点定义 \`userId\`、\`userData\`，函数中通过 \`inputs.userId\`、\`inputs.userData\` 访问

### 3. 输出结果映射  
- 函数返回值必须是对象类型
- 返回对象的字段名必须与节点 \`outputs\` 中定义的字段名完全一致
- outputs 中的 \`value\` 字段使用 \`$.节点名.result.字段名\` 格式引用
- 函数必须返回 outputs 中定义的所有字段

### 4. 引用规范
在其他节点中引用 code 节点的输出：
- \`$.CodeNodeName.result.outputFieldName\`
- 例如：\`$.ProcessUserData.result.isValid\`

## 代码编写要求（严格遵守）
1. **函数导出**: 必须使用 \`export default function main(inputs)\`，不允许其他导出方式
2. **返回值类型**: 必须返回对象类型，不能返回 string、number、boolean、array 等基础类型
3. **返回值完整性**: 必须返回包含所有 outputs 字段的对象，字段名完全匹配
4. **参数解构**: 推荐使用解构语法获取输入参数 \`const { param1, param2 } = inputs;\` 
5. **错误处理**: 必须包含 try-catch 错误处理，确保始终返回有效的对象结果
6. **类型安全**: 对输入参数进行类型检查和数据验证
7. **依赖管理**: 外部依赖必须在 dependencies 中声明

## 核心限制
1. **必须返回对象**：禁止返回string、number、boolean等基础类型
2. **固定函数签名**：\`export default function main(inputs)\`
3. **完整输出**：返回对象必须包含所有outputs定义的字段
4. **错误处理**：必须用try-catch确保始终返回有效结果

## 简单示例
\`\`\`javascript
export default function main(inputs) {
    const { userId, userData } = inputs;
    const isValid = userData.age >= 18;
    
    return {
        isValid,
        errorMsg: isValid ? null : "年龄不符合要求"
    };
}
\`\`\`
`;

export const getCodeNodePrompt = () => {
  return codeNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleCodeNodeDSL, null, 2)}
\`\`\`
`;
};