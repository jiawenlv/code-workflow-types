import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

// end 节点数据 schema
export const endNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("workflowEnd"),
  outputs: z.array(basetFieldUISchema),
});

// 默认数据示例
export const defaultEndNodeData: EndNodeData = {
  name: "workflowEnd",
  type: "workflowEnd",
  outputs: [],
};

export const endNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("workflowEnd"),
  data: endNodeDataUISchema,
})

// 类型导出
export type EndNodeData = z.infer<typeof endNodeDataUISchema>;
export type EndNode = z.infer<typeof endNodeUISchema>; 