
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

import { z } from "zod";;

// dbDelete 节点数据 schema
export const dbDeleteNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("dbDelete"),
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
export const defaultDbDeleteNodeData = {
  name: "DeleteRecord",
  type: "dbDelete",
  inputs: [],
  outputs: [
    {
      id: "affected",
      attrName: "affected",
      label: "影响行数",
      type: "number",
      isDynamic: false,
      valuePath: ["outputs", "affected"],
      valueLabelPath: ["outputs", "affected"],
      value: null,
      desc: "删除的记录数"
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

export const dbDeleteNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("dbDelete"),
  data: dbDeleteNodeDataUISchema,
})

// 类型导出
export type DbDeleteNodeData = z.infer<typeof dbDeleteNodeDataUISchema>;
export type DbDeleteNode = z.infer<typeof dbDeleteNodeUISchema>;