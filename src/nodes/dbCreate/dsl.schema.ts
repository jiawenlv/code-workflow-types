import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

import { z } from "zod";;

// 数据库创建配置 DSL schema
export const dbCreateConfigDSLSchema = z.object({
    table: z.string(),
    sql: z.string(), // SQL 插入语句，支持变量引用
});

// 数据库创建节点 DSL schema
export const dbCreateNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("dbCreate"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.object({
        affected: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("影响的行数")
        }).default({
            type: "number" as const,
            desc: "影响的行数"
        }),
        insertId: builtinOutputFieldDSLSchema.extend({
            type: z.literal("string"),
            desc: z.string().default("新插入记录的ID")
        }).default({
            type: "string" as const,
            desc: "新插入记录的ID"
        })
    }),
    configs: dbCreateConfigDSLSchema,
    nextNodes: z.array(z.string()),
});

// 类型导出
export type DbCreateConfig = z.infer<typeof dbCreateConfigDSLSchema>;
export type DbCreateNodeDSL = z.infer<typeof dbCreateNodeDSLSchema>;

// 验证函数
export const validateDbCreateNodeDSL = (data: unknown): DbCreateNodeDSL => {
    return dbCreateNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleDbCreateNodeDSL: DbCreateNodeDSL = {
    name: "CreateUser",
    type: "dbCreate",
    desc: "创建用户记录",
    inputs: {
        name: {
            type: "string",
            value: "$.GetUserData.outputs.name",
            desc: "用户名"
        },
        email: {
            type: "string",
            value: "$.GetUserData.outputs.email",
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
        table: "your_table_name",
        sql: "INSERT INTO your_table_name (name, email) VALUES ($.CreateUser.inputs.name, $.CreateUser.inputs.email)"
    },
    nextNodes: ["ProcessResult"]
};