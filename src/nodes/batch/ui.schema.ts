import { baseNodeUIchema, basetFieldUISchema } from "../../common";

import { z } from "zod";

// batch 节点数据 schema
export const batchNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("batch"),
  inputs: z.array(basetFieldUISchema),
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    concurrency: z.object({
      type: z.literal("number"),
      value: z.number().default(1)
    }),
    timeout: z.object({
      type: z.literal("number"),
      value: z.number().default(60)
    }),
    continueOnError: z.object({
      type: z.literal("boolean"),
      value: z.boolean().default(false)
    }),
    mapConfig: z.object({
      type: z.literal("object"),
      value: z.object({
        dataSource: z.string(),
        itemVariable: z.string().default("$.currentItem"),
        indexVariable: z.string().default("$.currentIndex")
      })
    }),
    reduceConfig: z.object({
      type: z.literal("object"),
      value: z.object({
        strategy: z.enum(["sum", "count", "collect", "first", "last", "max", "min"]),
        targetField: z.string().optional(),
        customLogic: z.string().optional()
      })
    })
  })
});

// 默认数据示例
export const defaultBatchNodeData = {
  name: "BatchProcess",
  type: "batch",
  inputs: [],
  outputs: [
    {
      attrName: "batchResult",
      label: "批处理结果",
      type: "object",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "批处理执行结果"
    },
    {
      attrName: "affectedTotal",
      label: "处理总数",
      type: "number",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "成功处理的数据条数"
    }
  ],
  configs: {
    concurrency: {
      type: "number",
      value: 1
    },
    timeout: {
      type: "number",
      value: 60
    },
    continueOnError: {
      type: "boolean",
      value: false
    },
    mapConfig: {
      type: "object",
      value: {
        dataSource: "",
        itemVariable: "currentItem",
        indexVariable: "currentIndex"
      }
    },
    reduceConfig: {
      type: "object",
      value: {
        strategy: "collect",
        targetField: ""
      }
    }
  }
};

export const batchNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("batch"),
  data: batchNodeDataUISchema,
})

// 类型导出
export type BatchNodeData = z.infer<typeof batchNodeDataUISchema>;
export type BatchNode = z.infer<typeof batchNodeUISchema>;