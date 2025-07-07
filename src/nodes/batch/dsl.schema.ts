
import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";
import { dbQueryConfigDSLSchema } from "../dbQuery/dsl.schema";
import { dbCreateConfigDSLSchema } from "../dbCreate/dsl.schema";
import { dbUpdateConfigDSLSchema } from "../dbUpdate/dsl.schema";
import { dbDeleteConfigDSLSchema } from "../dbDelete/dsl.schema";
import { z } from "zod";

// 支持的子节点配置类型
export const childNodeConfigSchema = z.union([
    dbQueryConfigDSLSchema,
    dbCreateConfigDSLSchema,
    dbUpdateConfigDSLSchema,
    dbDeleteConfigDSLSchema
]);

// Map配置 - 定义如何拆分数据
export const mapConfigSchema = z.object({
    dataSource: z.string(), // 数据源路径，如 "$.BatchNode.inputs.dataList"
    itemVariable: z.string().default("$.currentItem"), // 当前数据项变量名
    indexVariable: z.string().default("$.currentIndex"), // 当前索引变量名
});

// Reduce配置 - 定义如何合并结果
export const reduceConfigSchema = z.object({
    strategy: z.enum(["sum", "count", "collect", "first", "last", "max", "min"]),
    targetField: z.string().optional(), // 要聚合的字段名，如 "affected"
    customLogic: z.string().optional(), // 自定义合并逻辑（JavaScript表达式）
});

// 单一子节点定义
export const batchChildNodeSchema = z.object({
    name: z.string(),
    type: z.enum(["dbQuery", "dbCreate", "dbUpdate", "dbDelete", "code"]),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.record(z.string(), builtinOutputFieldDSLSchema),
    configs: z.any(), // 根据type动态确定具体配置
});

// Batch配置 DSL schema
export const batchConfigDSLSchema = z.object({
    concurrency: z.number().positive().default(1), // 并发数
    timeout: z.number().positive().default(60), // 总超时时间
    continueOnError: z.boolean().default(false), // 遇到错误是否继续
    mapConfig: mapConfigSchema,
    reduceConfig: reduceConfigSchema,
});

// Batch节点 DSL schema
export const batchNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("batch"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.object({
        totalProcessed: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("处理的总数量")
        }).default({
            type: "number" as const,
            desc: "处理的总数量"
        }),
        successCount: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("成功处理的数量")
        }).default({
            type: "number" as const,
            desc: "成功处理的数量"
        }),
        failureCount: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("失败处理的数量")
        }).default({
            type: "number" as const,
            desc: "失败处理的数量"
        }),
        aggregatedResult: builtinOutputFieldDSLSchema.extend({
            type: z.string(),
            desc: z.string().default("根据reduce策略聚合的结果")
        }).default({
            type: "any" as const,
            desc: "根据reduce策略聚合的结果"
        }),
        executionTime: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("批处理执行耗时（毫秒）")
        }).default({
            type: "number" as const,
            desc: "批处理执行耗时（毫秒）"
        })
    }),
    configs: batchConfigDSLSchema,
    child: batchChildNodeSchema, // 单一子节点
    nextNodes: z.array(z.string()),
});

// 类型导出
export type BatchNodeDSL = z.infer<typeof batchNodeDSLSchema>;
export type BatchChildNode = z.infer<typeof batchChildNodeSchema>;
export type MapConfig = z.infer<typeof mapConfigSchema>;
export type ReduceConfig = z.infer<typeof reduceConfigSchema>;

// 验证函数
export const validateBatchNodeDSL = (data: unknown): BatchNodeDSL => {
    return batchNodeDSLSchema.parse(data);
};

// 示例数据 - 批量插入用户
export const exampleBatchNodeDSL: BatchNodeDSL = {
    name: "BatchInsertUsers",
    type: "batch",
    desc: "批量插入用户数据并统计成功数量",
    inputs: {
        userList: {
            type: "array",
            value: "$.GetUserList.outputs.data",
            desc: "要插入的用户列表"
        }
    },
    outputs: {
        totalProcessed: {
            type: "number",
            desc: "处理的总数量"
        },
        successCount: {
            type: "number",
            desc: "成功插入的数量"
        },
        failureCount: {
            type: "number",
            desc: "失败插入的数量"
        },
        aggregatedResult: {
            type: "number",
            desc: "总的插入行数"
        },
        executionTime: {
            type: "number",
            desc: "批处理执行耗时（毫秒）"
        }
    },
    configs: {
        concurrency: 3,
        timeout: 120,
        continueOnError: true,
        mapConfig: {
            dataSource: "$.BatchInsertUsers.inputs.userList",
            itemVariable: "$.currentItem",
            indexVariable: "$.currentIndex"
        },
        reduceConfig: {
            strategy: "sum",
            targetField: "affected"
        }
    },
    child: {
        name: "InsertUser",
        type: "dbCreate",
        desc: "插入单个用户",
        inputs: {
            name: {
                type: "string",
                value: "$.currentItem.name",
                desc: "用户名"
            },
            email: {
                type: "string",
                value: "$.currentItem.email",
                desc: "邮箱"
            }
        },
        outputs: {
            affected: {
                type: "number",
                desc: "影响的行数"
            },
            insertId: {
                type: "string",
                desc: "新插入记录的ID"
            }
        },
        configs: {
            table: "users_table",
            sql: "INSERT INTO users_table (name, email) VALUES ($.InsertUser.inputs.name, $.InsertUser.inputs.email)"
        }
    },
    nextNodes: ["ProcessResult"]
};
