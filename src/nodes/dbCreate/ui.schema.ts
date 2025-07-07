import { baseNodeUIchema, basetFieldUISchema } from "../../common";

import { z } from "zod";;

// dbCreate 节点数据 schema
export const dbCreateNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("dbCreate"),
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
export const defaultDbCreateNodeData = {
  name: "CreateRecord",
  type: "dbCreate",
  inputs: [
  ],
  outputs: [
    {
      attrName: "affected",
      label: "影响行数",
      type: "number",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "插入的记录数"
    },
    {
      attrName: "insertId",
      label: "插入ID",
      type: "string",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "新插入记录的ID"
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

export const dbCreateNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("dbCreate"),
  data: dbCreateNodeDataUISchema,
})

// 类型导出
export type DbCreateNodeData = z.infer<typeof dbCreateNodeDataUISchema>;
export type DbCreateNode = z.infer<typeof dbCreateNodeUISchema>;