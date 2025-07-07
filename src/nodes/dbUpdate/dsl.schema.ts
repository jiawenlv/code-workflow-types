import { z } from "zod";
import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

// 数据库更新配置 DSL schema
export const dbUpdateConfigDSLSchema = z.object({
    table: z.string(),
    sql: z.string(), // SQL 更新语句，支持变量引用
});

// 数据库更新节点 DSL schema
export const dbUpdateNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("dbUpdate"),
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
    configs: dbUpdateConfigDSLSchema,
    nextNodes: z.array(z.string()),
});

// 类型导出
export type DbUpdateConfig = z.infer<typeof dbUpdateConfigDSLSchema>;
export type DbUpdateNodeDSL = z.infer<typeof dbUpdateNodeDSLSchema>;

// 验证函数
export const validateDbUpdateNodeDSL = (data: unknown): DbUpdateNodeDSL => {
    return dbUpdateNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleDbUpdateNodeDSL: DbUpdateNodeDSL = {
    name: "UpdateRecord",
    type: "dbUpdate",
    desc: "更新记录信息",
    inputs: {
        recordId: {
            type: "string",
            value: "$.GetRecordInfo.outputs.recordId",
            desc: "记录ID"
        },
        status: {
            type: "string",
            value: "$.GetRecordInfo.outputs.status",
            desc: "记录状态"
        }
    },
    outputs: {
        affected: {
            type: "number",
            desc: "影响的行数"
        }
    },
    configs: {
        table: "your_table_name",
        sql: "UPDATE your_table_name SET status = $.UpdateRecord.inputs.status WHERE id = $.UpdateRecord.inputs.recordId"
    },
    nextNodes: ["ProcessResult"]
};