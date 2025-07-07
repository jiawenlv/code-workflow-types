import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

import { z } from "zod";;

// 数据库删除配置 DSL schema
export const dbDeleteConfigDSLSchema = z.object({
    table: z.string(),
    sql: z.string(), // SQL 删除语句，支持变量引用
});

// 数据库删除节点 DSL schema
export const dbDeleteNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("dbDelete"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.object({
        affected: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("影响的行数")
        }).default({
            type: "number" as const,
            desc: "影响的行数"
        })
    }),
    configs: dbDeleteConfigDSLSchema,
    nextNodes: z.array(z.string()),
});

// 类型导出
export type DbDeleteConfig = z.infer<typeof dbDeleteConfigDSLSchema>;
export type DbDeleteNodeDSL = z.infer<typeof dbDeleteNodeDSLSchema>;

// 验证函数
export const validateDbDeleteNodeDSL = (data: unknown): DbDeleteNodeDSL => {
    return dbDeleteNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleDbDeleteNodeDSL: DbDeleteNodeDSL = {
    name: "DeleteRecord",
    type: "dbDelete",
    desc: "删除目标记录",
    inputs: {
        recordId: {
            type: "string",
            value: "$.GetTargetRecord.outputs.recordId",
            desc: "记录ID"
        }
    },
    outputs: {
        affected: {
            type: "number",
            desc: "影响的行数"
        }
    },
    configs: {
        table: "target_table",
        sql: "DELETE FROM target_table WHERE id = $.DeleteRecord.inputs.recordId"
    },
    nextNodes: ["ProcessResult"]
};