import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

// 导入数据库操作节点的UI schema
import { dbCreateNodeDataUISchema } from "../dbCreate/ui.schema";
import { dbUpdateNodeDataUISchema } from "../dbUpdate/ui.schema";
import { dbDeleteNodeDataUISchema } from "../dbDelete/ui.schema";

// 数据库创建子节点UI schema
export const dbCreateChildNodeUISchema = dbCreateNodeDataUISchema.extend({
  order: z.number().min(1),
});

// 数据库更新子节点UI schema
export const dbUpdateChildNodeUISchema = dbUpdateNodeDataUISchema.extend({
  order: z.number().min(1),
});

// 数据库删除子节点UI schema
export const dbDeleteChildNodeUISchema = dbDeleteNodeDataUISchema.extend({
  order: z.number().min(1),
});

// 子节点联合类型
export const childNodeUISchema = z.union([
  dbCreateChildNodeUISchema,
  dbUpdateChildNodeUISchema,
  dbDeleteChildNodeUISchema
]);

// 事务配置 schema
export const transactionConfigSchema = z.object({
  isolation: z.enum(["READ_UNCOMMITTED", "READ_COMMITTED", "REPEATABLE_READ", "SERIALIZABLE"]),
  timeout: z.number(),
});

// transaction 节点数据 schema
export const transactionNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("transaction"),
  inputs: z.array(basetFieldUISchema),
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    config: z.object({
      type: z.literal("transactionOptions"),
      value: transactionConfigSchema,
    }),
  }),
  children: z.array(childNodeUISchema),
});

// 默认数据示例
export const defaultTransactionNodeData = {
  label: "数据库事务",
  inputs: [],
  outputs: [
    {
      attrName: "transactionResult",
      label: "事务结果",
      removable: true,
      editable: true,
      valueType: "object",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: "",
    },
    {
      attrName: "affectedRows",
      label: "总影响行数",
      removable: true,
      editable: true,
      valueType: "number",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: "",
    },
  ],
  configs: {
    isolation: {
      type: "string",
      value: "READ_COMMITTED",
    },
    timeout: {
      type: "number",
      value: 60,
    },
  },
  children: [],
};

export const transactionNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("transaction"),
  data: transactionNodeDataUISchema,
});

// 类型导出
export type TransactionNodeData = z.infer<typeof transactionNodeDataUISchema>;
export type TransactionNode = z.infer<typeof transactionNodeUISchema>;