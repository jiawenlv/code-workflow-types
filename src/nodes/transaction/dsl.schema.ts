import { z } from "zod";
import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

// 导入数据库操作节点的配置schema
import { dbQueryConfigDSLSchema } from "../dbQuery/dsl.schema";
import { dbCreateConfigDSLSchema } from "../dbCreate/dsl.schema";
import { dbUpdateConfigDSLSchema } from "../dbUpdate/dsl.schema";
import { dbDeleteConfigDSLSchema } from "../dbDelete/dsl.schema";

// 事务数据库子节点类型定义
export const transactionDbQueryChildSchema = z.object({
    name: z.string(),
    type: z.literal("dbQuery"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.record(z.string(), builtinOutputFieldDSLSchema),
    configs: dbQueryConfigDSLSchema,
    order: z.number().min(1),
});

export const transactionDbCreateChildSchema = z.object({
    name: z.string(),
    type: z.literal("dbCreate"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.record(z.string(), builtinOutputFieldDSLSchema),
    configs: dbCreateConfigDSLSchema,
    order: z.number().min(1),
});

export const transactionDbUpdateChildSchema = z.object({
    name: z.string(),
    type: z.literal("dbUpdate"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.record(z.string(), builtinOutputFieldDSLSchema),
    configs: dbUpdateConfigDSLSchema,
    order: z.number().min(1),
});

export const transactionDbDeleteChildSchema = z.object({
    name: z.string(),
    type: z.literal("dbDelete"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.record(z.string(), builtinOutputFieldDSLSchema),
    configs: dbDeleteConfigDSLSchema,
    order: z.number().min(1),
});

// 子节点联合类型
export const childNodeDSLSchema = z.union([
    transactionDbQueryChildSchema,
    transactionDbCreateChildSchema,
    transactionDbUpdateChildSchema,
    transactionDbDeleteChildSchema
]);

// 事务配置 DSL schema
export const transactionConfigDSLSchema = z.object({
    isolation: z.enum(["READ_UNCOMMITTED", "READ_COMMITTED", "REPEATABLE_READ", "SERIALIZABLE"]).default("READ_COMMITTED"),
    timeout: z.number().positive().default(60),
});

// 事务节点 DSL schema
export const transactionNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("transaction"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.record(z.string(), builtinOutputFieldDSLSchema),
    configs: transactionConfigDSLSchema,
    children: z.array(childNodeDSLSchema), // 完整的子节点定义列表
    nextNodes: z.array(z.string()),
});

// 类型导出
export type TransactionNodeDSL = z.infer<typeof transactionNodeDSLSchema>;
export type ChildNodeDSL = z.infer<typeof childNodeDSLSchema>;
export type TransactionConfigDSL = z.infer<typeof transactionConfigDSLSchema>;

// 验证函数
export const validateTransactionNodeDSL = (data: unknown): TransactionNodeDSL => {
    return transactionNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleTransactionNodeDSL: TransactionNodeDSL = {
    name: "CreateRecordTransaction",
    type: "transaction",
    desc: "创建记录事务",
    inputs: {
        name: {
            type: "string",
            value: "$.GetRecordData.outputs.name",
            desc: "记录名称"
        }
    },
    outputs: {
        committed: {
            type: "boolean",
            desc: "事务是否成功提交"
        },
        affectedTotal: {
            type: "number", 
            desc: "事务中所有操作影响的总行数"
        },
        childResults: {
            type: "array",
            desc: "所有子节点的执行结果数组"
        },
        executionTime: {
            type: "number",
            desc: "事务执行耗时（毫秒）"
        }
    },
    configs: {
        isolation: "READ_COMMITTED",
        timeout: 60
    },
    children: [
        {
            name: "CreateRecord",
            type: "dbCreate",
            desc: "创建记录",
            order: 1,
            inputs: {
                name: {
                    type: "string",
                    value: "$.CreateRecordTransaction.inputs.name",
                    desc: "记录名称"
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
                sql: "INSERT INTO your_table_name (name) VALUES ($.CreateRecord.inputs.name)"
            }
        }
    ],
    nextNodes: ["ProcessResult"]
};