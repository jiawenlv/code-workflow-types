
import { exampleHttpNodeDSL } from './dsl.schema';

// HTTP request node prompt template
export const httpNodePrompt = `
# HTTP请求节点 (HTTP Request Node)

## 功能说明
此节点用于发送HTTP请求，支持多种请求方法、参数类型和请求体格式。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
HTTP节点固定返回以下字段：
- **code**: HTTP状态码（数字类型）
- **data**: 响应数据（对象类型）

## configs 配置参数
节点特定的配置参数，详见下方配置参数部分

## 配置参数

### 基本配置
- **method**: HTTP请求方法 (GET, POST, PUT, PATCH, DELETE) *(必填)*
- **url**: 请求URL，支持路径参数 :paramName *(必填)*
- **timeout**: 请求超时时间（秒），默认30秒 *(可选)*

### 路径参数 (params) *(可选)*
路径参数以键值对对象形式配置，key为参数名，value为参数值

### 查询参数 (queryParams) *(可选)*
查询参数以键值对对象形式配置，key为参数名，value为参数值

### 请求头 (headers) *(可选)*
请求头以键值对对象形式配置，key为头部名称，value为头部值

### 请求体配置
- **bodyType**: 请求体类型 (none, json, form-data, text) *(必填)*
- **body**: 请求体内容，字符串格式 *(可选)*

## 配置示例
\`\`\`json
{
  "method": "POST",
  "url": "https://api.example.com/users/:userId/profile",
  "timeout": 30,
  "params": {
    "userId": "$.HttpRequest.inputs.userId"
  },
  "queryParams": {
    "format": "json",
    "version": "v1"
  },
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer $.HttpRequest.inputs.token"
  },
  "bodyType": "json",
  "body": "$.HttpRequest.inputs.userData"
}
\`\`\`

## 输出结果说明
- **code**: HTTP状态码，用于判断请求是否成功
- **data**: HTTP响应数据，包含服务器返回的具体内容

## 变量引用
在参数值中可以使用 JSON Path 格式引用数据：
- \`$.节点名.inputs.字段名\` - 引用当前节点输入参数
- \`$.节点名.outputs.字段名\` - 引用其他节点输出

## 注意事项
1. URL中的路径参数用 :paramName 格式
2. 查询参数会自动编码
3. 建议设置合理的超时时间
4. POST/PUT请求需要配置适当的请求体
5. 敏感信息建议通过环境变量传递
`;

export const getHttpNodePrompt = () => {
    return httpNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleHttpNodeDSL, null, 2)}
\`\`\`
`;
};