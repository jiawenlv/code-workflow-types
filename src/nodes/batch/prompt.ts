import { exampleBatchNodeDSL } from './dsl.schema';

// Batch node prompt template
export const batchNodePrompt = `
# 批量处理节点 (Batch Node)

## 功能说明
此节点用于实现Map-Reduce模式的批量数据处理，将数据源拆分为多个子项，对每个子项执行相同的操作，最后聚合结果。

## inputs 输入参数
用户自由配置，根据具体业务需求定义输入数据，通常包含需要批量处理的数据列表。

## outputs 输出参数
批量处理节点固定返回以下字段：
- **totalProcessed**: 处理的总数量（数字类型）
- **successCount**: 成功处理的数量（数字类型）
- **failureCount**: 失败处理的数量（数字类型）
- **aggregatedResult**: 根据reduce策略聚合的结果（任意类型）
- **executionTime**: 批处理执行耗时，单位毫秒（数字类型）

## configs 配置参数
节点特定的配置参数，详见下方配置参数部分

## 配置参数

### 基本配置
- **concurrency**: 并发数，默认1 *(可选)*
- **timeout**: 总超时时间（秒），默认60秒 *(可选)*
- **continueOnError**: 遇到错误是否继续处理，默认false *(可选)*

### Map配置 (mapConfig) *(必填)*
定义如何拆分数据和访问当前项：
- **dataSource**: 数据源路径，如 "$.BatchNode.inputs.dataList" *(必填)*
- **itemVariable**: 当前数据项变量名，默认"$.currentItem" *(可选)*
- **indexVariable**: 当前索引变量名，默认"$.currentIndex" *(可选)*

### Reduce配置 (reduceConfig) *(必填)*
定义如何合并结果：
- **strategy**: 聚合策略，支持 "sum", "count", "collect", "first", "last", "max", "min" *(必填)*
- **targetField**: 要聚合的字段名，如 "affected" *(可选)*
- **customLogic**: 自定义合并逻辑（JavaScript表达式）*(可选)*

## 聚合策略说明
- **sum**: 对指定字段求和
- **count**: 统计成功处理的数量
- **collect**: 收集所有结果到数组
- **first**: 返回第一个结果
- **last**: 返回最后一个结果
- **max**: 返回最大值
- **min**: 返回最小值

## 子节点配置 (child) *(必填)*
单个子节点定义，包含完整的节点配置：
- **name**: 子节点名称 *(必填)*
- **type**: 节点类型 (dbQuery, dbCreate, dbUpdate, dbDelete, code) *(必填)*
- **desc**: 节点描述 *(必填)*
- **inputs**: 节点输入参数 *(必填)*
- **outputs**: 节点输出参数 *(必填)*
- **configs**: 节点的具体配置 *(必填)*

## 数据访问模式
在子节点中可以使用以下变量访问数据：
- \`$.currentItem\` - 当前正在处理的数据项
- \`$.currentIndex\` - 当前数据项的索引
- \`$.节点名.inputs.字段名\` - 引用batch节点的输入参数

## 配置示例
\`\`\`json
{
  "configs": {
    "concurrency": 3,
    "timeout": 120,
    "continueOnError": true,
    "mapConfig": {
      "dataSource": "$.BatchInsertUsers.inputs.userList",
      "itemVariable": "$.currentItem",
      "indexVariable": "$.currentIndex"
    },
    "reduceConfig": {
      "strategy": "sum",
      "targetField": "affected"
    }
  },
  "child": {
    "name": "InsertUser",
    "type": "dbCreate",
    "desc": "插入单个用户",
    "inputs": {
      "name": {
        "type": "string",
        "value": "$.currentItem.name",
        "desc": "用户名"
      },
      "email": {
        "type": "string",
        "value": "$.currentItem.email",
        "desc": "邮箱"
      }
    },
    "outputs": {
      "affected": {
        "type": "number",
        "desc": "影响的行数"
      },
      "insertId": {
        "type": "string",
        "desc": "新插入记录的ID"
      }
    },
    "configs": {
      "table": "users_table",
      "sql": "INSERT INTO users_table (name, email) VALUES ($.InsertUser.inputs.name, $.InsertUser.inputs.email)"
    }
  }
}
\`\`\`

## 执行流程
1. **数据拆分**: 根据mapConfig.dataSource获取数据源并拆分为子项
2. **并发处理**: 按concurrency配置并发执行子节点操作
3. **结果收集**: 收集每个子项的执行结果
4. **数据聚合**: 根据reduceConfig策略聚合结果
5. **输出结果**: 返回统计信息和聚合结果

## 使用场景
- 批量数据插入：将用户列表批量插入数据库
- 批量数据更新：批量更新商品价格
- 批量数据验证：批量验证邮箱格式
- 批量API调用：批量调用外部服务

## 注意事项
1. 子节点必须是支持的类型：dbQuery, dbCreate, dbUpdate, dbDelete, code
2. 数据源必须是数组类型
3. 子节点的输入参数通过$.currentItem访问当前处理的数据项
4. 聚合策略需要根据实际业务需求选择合适的类型
5. 并发数过大可能影响系统性能，需根据实际情况调整
6. 建议为重要的批量操作设置适当的超时时间
7. child配置包含完整的节点定义，而不是简单的配置引用
`;

export const getBatchNodePrompt = () => {
    return batchNodePrompt + `

## DSL 完整示例
\`\`\`json
${JSON.stringify(exampleBatchNodeDSL, null, 2)}
\`\`\`
`;
};