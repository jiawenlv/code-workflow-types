import { exampleDbUpdateNodeDSL } from './dsl.schema';

// 数据库更新节点提示词模板
export const dbUpdateNodePrompt = `
# 数据库更新节点 (DbUpdate Node)

## 功能说明
此节点用于执行数据库更新操作（UPDATE），专门用于数据修改。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
数据库更新节点固定返回以下字段：
- **affected**: 影响的行数（数字类型）

## configs 配置参数
- **table**: 更新的表名称 *(必填)*
- **sql**: SQL 更新语句，支持变量引用 *(必填)*

## 变量引用
在 sql 字段中可以使用 JSON Path 格式引用数据：
- \`$.节点名.inputs.字段名\` - 引用当前节点输入参数
- \`$.节点名.outputs.字段名\` - 引用其他节点输出

## 注意事项
1. 只支持 UPDATE 更新操作
2. affected 字段返回实际被更新的记录数量
3. 强烈建议 UPDATE 操作加 WHERE 条件，避免全表更新
4. 字段名和表名会自动进行SQL注入防护
5. 支持数据库函数如 NOW()、CONCAT() 等
6. 变量引用支持嵌套对象访问，如 \`$.UpdateUser.inputs.user.profile.email\`
7. WHERE 条件必须明确，确保只更新目标记录
`;

export const getDbUpdateNodePrompt = () => {
  return dbUpdateNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleDbUpdateNodeDSL, null, 2)}
\`\`\`
`;
};