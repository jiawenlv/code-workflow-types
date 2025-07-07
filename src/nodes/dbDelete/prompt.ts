import { exampleDbDeleteNodeDSL } from './dsl.schema';

// 数据库删除节点提示词模板
export const dbDeleteNodePrompt = `
# 数据库删除节点 (DbDelete Node)

## 功能说明
此节点用于执行数据库删除操作（DELETE），专门用于数据删除。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
数据库删除节点固定返回以下字段：
- **affected**: 影响的行数（数字类型）

## configs 配置参数
- **table**: 删除的表名称 *(必填)*
- **sql**: SQL 删除语句，支持变量引用 *(必填)*

## 变量引用
在 sql 字段中可以使用 JSON Path 格式引用数据：
- \`$.节点名.inputs.字段名\` - 引用当前节点输入参数
- \`$.节点名.outputs.字段名\` - 引用其他节点输出

## 注意事项
1. 只支持 DELETE 删除操作
2. affected 字段返回实际被删除的记录数量
3. 强烈建议 DELETE 操作加 WHERE 条件，避免全表删除
4. 字段名和表名会自动进行SQL注入防护
5. 删除操作不可逆，请谨慎使用
6. 变量引用支持嵌套对象访问，如 \`$.DeleteUser.inputs.user.profile.email\`
7. WHERE 条件必须明确，确保只删除目标记录
8. 考虑使用软删除（更新状态字段）代替物理删除
`;

export const getDbDeleteNodePrompt = () => {
  return dbDeleteNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleDbDeleteNodeDSL, null, 2)}
\`\`\`
`;
};