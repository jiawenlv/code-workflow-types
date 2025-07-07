import { exampleTransactionNodeDSL } from './dsl.schema';

// Transaction node prompt template
export const transactionNodePrompt = `
# 数据库事务节点 (Transaction Node)

## 功能说明
此节点用于将多个数据库操作包装在一个事务中执行，保证原子性、一致性、隔离性和持久性（ACID特性）。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据

## outputs 输出参数
事务节点固定返回以下字段：
- **committed**: 事务是否成功提交（布尔类型）
- **affectedTotal**: 事务中所有操作影响的总行数（数字类型）
- **childResults**: 所有子节点的执行结果数组（数组类型）
- **executionTime**: 事务执行耗时，单位毫秒（数字类型）

## configs 配置参数
节点特定的配置参数，详见下方配置参数部分

## 配置参数

### 基本配置
- **isolation**: 事务隔离级别，默认READ_COMMITTED *(可选)*
- **timeout**: 事务超时时间（秒），默认60秒 *(可选)*

### 子节点配置 (children) *(必填)*
每个子节点都是完整的数据库操作节点定义：
- **name**: 子节点名称 *(必填)*
- **type**: 节点类型 (dbCreate, dbUpdate, dbDelete) *(必填)*
- **desc**: 节点描述 *(必填)*
- **order**: 执行顺序，从1开始 *(必填)*
- **inputs**: 节点输入参数 *(可选)*
- **outputs**: 节点输出参数 *(必填)*
- **configs**: 节点的具体配置 *(必填)*

## 隔离级别
- **READ_UNCOMMITTED**: 读未提交（最低隔离级别）
- **READ_COMMITTED**: 读已提交（默认级别）
- **REPEATABLE_READ**: 可重复读
- **SERIALIZABLE**: 串行化（最高隔离级别）

## 配置示例
\`\`\`json
{
  "configs": {
    "isolation": "READ_COMMITTED",
    "timeout": 60
  },
  "children": [
    {
      "name": "CreateUser",
      "type": "dbCreate",
      "desc": "创建新用户",
      "order": 1,
      "inputs": {},
      "outputs": {
        "affected": {
          "type": "number",
          "desc": "影响的行数"
        },
        "insertId": {
          "type": "string",
          "desc": "新用户ID"
        }
      },
      "configs": {
        "table": "your_table_name",
        "data": {
          "name": "$.TransactionNode.inputs.userData.name",
          "email": "$.TransactionNode.inputs.userData.email",
          "status": "active"
        },
        "timeout": 30
      }
    },
    {
      "name": "CreateProfile",
      "type": "dbCreate",
      "desc": "创建用户档案",
      "order": 2,
      "inputs": {},
      "outputs": {
        "affected": {
          "type": "number",
          "desc": "影响的行数"
        },
        "insertId": {
          "type": "string",
          "desc": "档案ID"
        }
      },
      "configs": {
        "table": "related_table",
        "data": {
          "user_id": "$.CreateUser.outputs.insertId",
          "bio": "$.TransactionNode.inputs.userData.bio"
        },
        "timeout": 30
      }
    }
  ]
}
\`\`\`

## 输出结果
事务节点的输出结果为内置字段，系统自动生成，不需要在DSL中配置value字段

## 子节点数据引用
在子节点配置中可以使用 JSON Path 格式引用：
- \`$.节点名.inputs.字段名\` - 引用事务节点的输入参数
- \`$.节点名.outputs.字段名\` - 引用其他子节点的输出

## 执行流程
1. **开启事务**: 根据isolation级别创建数据库事务
2. **顺序执行**: 按order顺序执行所有子节点
3. **结果收集**: 收集每个子节点的执行结果
4. **提交/回滚**: 全部成功则提交事务，任意失败则回滚

## 注意事项
1. 事务中的所有数据库操作要么全部成功，要么全部失败
2. 只支持数据库操作节点 (dbCreate, dbUpdate, dbDelete)
3. 子节点的order必须唯一且连续，从1开始
4. 长事务可能影响数据库性能，合理设置timeout
5. 子节点间的数据依赖要通过引用路径正确配置
6. 事务失败时会自动回滚所有已执行的操作
7. 建议将相关的数据库操作组合在同一个事务中
8. children数组包含完整的节点定义，而不是简单的配置引用
`;

export const getTransactionNodePrompt = () => {
    return transactionNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleTransactionNodeDSL, null, 2)}
\`\`\`
`;
};