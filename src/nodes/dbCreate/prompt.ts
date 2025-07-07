import { exampleDbCreateNodeDSL } from './dsl.schema';

// 数据库创建节点提示词模板
export const dbCreateNodePrompt = `
# 数据库创建节点 (DbCreate Node)

## 功能说明
此节点用于执行数据库插入操作（INSERT），专门用于数据创建。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
数据库创建节点固定返回以下字段：
- **affected**: 影响的行数（数字类型）
- **insertId**: 新插入记录的ID（字符串类型）

## configs 配置参数
- **table**: 插入的表名称 *(必填)*
- **sql**: SQL 插入语句，支持变量引用 *(必填)*

## 变量引用
在 sql 字段中可以使用 JSON Path 格式引用数据：
- \`$.节点名.inputs.字段名\` - 引用当前节点输入参数
- \`$.节点名.outputs.字段名\` - 引用其他节点输出

## 注意事项
1. 只支持 INSERT 插入操作
2. insertId 字段返回新创建记录的主键ID
3. affected 字段通常为1，表示成功插入一条记录
4. 字段名和表名会自动进行SQL注入防护
5. 支持数据库函数如 NOW()、UUID() 等
6. 变量引用支持嵌套对象访问，如 \`$.CreateUser.inputs.user.profile.email\`
7. 确保必填字段都有对应的输入参数
`;

export const getDbCreateNodePrompt = () => {
  return dbCreateNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleDbCreateNodeDSL, null, 2)}
\`\`\`
`;
};