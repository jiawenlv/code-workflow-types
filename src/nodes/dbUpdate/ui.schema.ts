import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

// dbUpdate 节点数据 schema
export const dbUpdateNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("dbUpdate"),
  inputs: z.array(basetFieldUISchema),
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    table: z.object({
      type: z.literal("string"),
      value: z.string()
    }),
    sql: z.object({
      type: z.literal("longText"),
      value: z.string()
    })
  })
});

// 默认数据示例
export const defaultDbUpdateNodeData = {
  name: "UpdateRecord",
  type: "dbUpdate",
  inputs: [],
  outputs: [
    {
      id: "affected",
      attrName: "affected",
      label: "影响行数",
      type: "number",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "更新的记录数"
    }
  ],
  configs: {
    table: {
      type: "dbTableName",
      value: ""
    },
    sql: {
      type: "longText",
      value: ""
    }
  }
};

export const dbUpdateNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("dbUpdate"),
  data: dbUpdateNodeDataUISchema,
})

// 类型导出
export type DbUpdateNodeData = z.infer<typeof dbUpdateNodeDataUISchema>;
export type DbUpdateNode = z.infer<typeof dbUpdateNodeUISchema>;