import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

// start 节点数据 schema
export const startNodeDataUISchema = z.object({
  inputs: z.array(basetFieldUISchema),
  type: z.literal("workflowStart"),
  name: z.string(),
});

// 默认数据示例
export const defaultStartNodeData: StartNodeData = {
  name: "workflowStart",
  type: "workflowStart",
  inputs: [],
};

export const startNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("workflowStart"),
  data: startNodeDataUISchema,
})

// 类型导出
export type StartNodeData = z.infer<typeof startNodeDataUISchema>;
export type StartNode = z.infer<typeof startNodeUISchema>; 