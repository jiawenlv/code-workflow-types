import { exampleEndNodeDSL, exampleEndNodeComposedDSL, exampleEndNodeCreateDSL, exampleEndNodeStringDSL, exampleEndNodeDeleteDSL } from "./dsl.schema";

export const getEndNodePrompt = () => {
  return `# 工作流结束节点 (End Node)

## 功能说明
工作流结束节点，定义工作流的API响应输出结果，作为工作流的终止点。**必须返回标准的API响应格式**。

## inputs 输入参数
用户自由配置，通常用于接收前面节点的最终结果

## outputs 输出参数 *(必填)*
End节点必须定义标准的API响应格式，包含以下固定字段：

### 必需字段
- **code**: HTTP状态码（数字类型）
  - 成功操作: 200
  - 创建成功: 201
  - 客户端错误: 400
  - 未授权: 401
  - 禁止访问: 403
  - 资源未找到: 404
  - 服务器错误: 500

- **data**: 响应数据（字符串或对象类型）
  - 包含实际的业务数据
  - 可以是简单字符串（如ID、确认消息）
  - 也可以是复杂对象（如用户信息、列表数据）
  - 支持字符串、对象、数组等各种数据格式

- **message**: 响应消息（字符串类型）
  - 操作结果的描述信息
  - 成功消息或错误提示

### Data结构定义
data字段支持多种类型和定义方式：

#### 1. 字符串类型 - 简单数据
适用于ID、确认消息等简单场景：
\`\`\`json
{
  "data": {
    "type": "string",
    "value": "$.CreateUser.outputs.insertId",
    "desc": "新创建的用户ID"
  }
}
\`\`\`

#### 2. 对象类型 - 直接引用
当前面的节点已经返回了完整的数据结构时，直接引用即可：
\`\`\`json
{
  "data": {
    "type": "object",
    "value": "$.ProcessResult.outputs.result",
    "desc": "业务处理结果（完整对象数据）"
  }
}
\`\`\`

#### 3. 对象类型 - 组合模式
当需要从多个节点组合数据时，在properties中定义具体字段：
\`\`\`json
{
  "data": {
    "type": "object",
    "desc": "分页查询结果",
    "properties": {
      "list": {
        "type": "array",
        "value": "$.QueryUsers.outputs.data",
        "desc": "用户列表数据"
      },
      "total": {
        "type": "number", 
        "value": "$.CountUsers.outputs.affected",
        "desc": "用户总数"
      }
    }
  }
}
\`\`\`

### 支持的字段
- **type**: 数据类型 (string, number, boolean, object, array)
- **value**: 数据来源引用（可选，但data或其子级必须至少有一个）
- **desc**: 字段描述
- **properties**: 对象的属性定义（支持嵌套）
- **items**: 数组元素类型定义
- **enum**: 枚举值限制

## configs 配置参数
此节点类型无需特殊配置

## 常见响应格式

### 1. 字符串响应
适用于：简单确认、ID返回、状态消息
data为字符串类型

### 2. 单个对象响应
适用于：创建、更新、查询单个资源
data为对象类型

### 3. 列表响应
适用于：查询列表、分页数据
建议包含：list（数据数组）、total（总数）、page（页码）、pageSize（页大小）

### 4. 操作确认响应
适用于：删除、状态变更等操作
可以是简单字符串确认或包含操作结果的对象

## 配置示例

### 示例1: 字符串数据 - 简单ID返回
\`\`\`json
${JSON.stringify(exampleEndNodeStringDSL, null, 2)}
\`\`\`

### 示例2: 对象数据 - 直接引用完整数据
\`\`\`json
${JSON.stringify(exampleEndNodeDSL, null, 2)}
\`\`\`

### 示例3: 组合模式 - 从多个节点组合数据
\`\`\`json
${JSON.stringify(exampleEndNodeComposedDSL, null, 2)}
\`\`\`

### 示例4: 创建操作 - 组合结果响应
\`\`\`json
${JSON.stringify(exampleEndNodeCreateDSL, null, 2)}
\`\`\`

### 示例5: 删除操作 - 简单确认
\`\`\`json
${JSON.stringify(exampleEndNodeDeleteDSL, null, 2)}
\`\`\`

## 强制要求
1. **必须包含code、data、message三个字段**
2. **data或其子级必须至少有一个value引用**，确保有实际数据返回
3. **合理设置HTTP状态码**，与业务操作结果匹配
4. **明确定义数据类型**，使用type字段标明每个数据的类型

## 使用建议
1. **选择合适的类型**：根据业务场景选择string或object类型
2. **优先使用简单模式**：如果前置节点已经构建好完整数据，直接引用
3. **合理使用组合模式**：需要从多个节点收集数据时才使用properties
4. **字符串适用场景**：ID返回、简单确认消息、状态字符串等
5. **对象适用场景**：复杂数据结构、列表数据、多字段信息等
6. **避免过度嵌套**：保持结构简单清晰，便于理解和维护
7. **描述要准确**：desc字段要准确描述数据内容和用途
8. **类型要匹配**：type字段要与实际数据类型一致
9. **保持一致性**：所有API都应使用相同的响应结构
`;
}; 