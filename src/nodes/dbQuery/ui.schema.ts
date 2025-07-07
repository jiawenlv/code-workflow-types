import { baseNodeUIchema, basetFieldUISchema } from "../../common";

import { z } from "zod";;

// dbQuery 节点数据 schema
export const dbQueryNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("dbQuery"),
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
export const defaultDbQueryNodeData = {
  name: "QueryData",
  type: "dbQuery",
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
      desc: "查询返回的记录数"
    },
    {
      id: "data",
      attrName: "data",
      label: "查询结果",
      type: "array",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "查询返回的数据"
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

export const dbQueryNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("dbQuery"),
  data: dbQueryNodeDataUISchema,
})

// 类型导出
export type DbQueryNodeData = z.infer<typeof dbQueryNodeDataUISchema>;
export type DbQueryNode = z.infer<typeof dbQueryNodeUISchema>;