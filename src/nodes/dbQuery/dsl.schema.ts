import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

import { z } from "zod";;

// 数据库查询配置 DSL schema
export const dbQueryConfigDSLSchema = z.object({
    table: z.string(),
    sql: z.string(), // SQL 查询语句，支持变量引用
});

// 数据库查询节点 DSL schema
export const dbQueryNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("dbQuery"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.object({
        affected: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("查询返回的行数")
        }).default({
            type: "number" as const,
            desc: "查询返回的行数"
        }),
        data: builtinOutputFieldDSLSchema.extend({
            type: z.literal("array"),
            desc: z.string().default("查询结果数据")
        }).default({
            type: "array" as const,
            desc: "查询结果数据"
        })
    }),
    configs: dbQueryConfigDSLSchema,
    nextNodes: z.array(z.string()),
});

// 类型导出
export type DbQueryConfig = z.infer<typeof dbQueryConfigDSLSchema>;
export type DbQueryNodeDSL = z.infer<typeof dbQueryNodeDSLSchema>;

// 验证函数
export const validateDbQueryNodeDSL = (data: unknown): DbQueryNodeDSL => {
    return dbQueryNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleDbQueryNodeDSL: DbQueryNodeDSL = {
    name: "QueryUser",
    type: "dbQuery",
    desc: "查询用户信息",
    inputs: {
        userId: {
            type: "string",
            value: "$.GetUserId.outputs.userId",
            desc: "用户ID"
        }
    },
    outputs: {
        affected: {
            type: "number",
            desc: "查询返回的行数"
        },
        data: {
            type: "array",
            desc: "查询结果数据"
        }
    },
    configs: {
        table: "your_table_name",
        sql: "SELECT * FROM your_table_name WHERE id = $.QueryUser.inputs.userId"
    },
    nextNodes: ["ProcessResult"]
};