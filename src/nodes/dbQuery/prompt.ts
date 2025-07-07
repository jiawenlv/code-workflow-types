import { exampleDbQueryNodeDSL } from './dsl.schema';

// 数据库查询节点提示词模板
export const dbQueryNodePrompt = `
# 数据库查询节点 (DbQuery Node)

## 功能说明
此节点用于执行数据库查询操作（SELECT），专门用于数据检索。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
数据库查询节点固定返回以下字段：
- **affected**: 查询返回的行数（数字类型）
- **data**: 查询结果数据（数组类型）

## configs 配置参数
- **table**: 查询的表名称 *(必填)*
- **sql**: SQL 查询语句，支持变量引用 *(必填)*

## 变量引用
在 sql 字段中可以使用 JSON Path 格式引用数据：
- \`$.节点名.inputs.字段名\` - 引用当前节点输入参数
- \`$.节点名.outputs.字段名\` - 引用其他节点输出

## 注意事项
1. 只支持 SELECT 查询操作
2. 查询结果以数组形式返回，每个元素为一行记录
3. 字段名和表名会自动进行SQL注入防护
4. 支持数据库函数如 NOW()、COUNT() 等
5. 变量引用支持嵌套对象访问，如 \`$.QueryUser.inputs.user.profile.email\`
6. 合理使用 WHERE 条件和 LIMIT 子句优化查询性能
`;

export const getDbQueryNodePrompt = () => {
  return dbQueryNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleDbQueryNodeDSL, null, 2)}
\`\`\`
`;
};