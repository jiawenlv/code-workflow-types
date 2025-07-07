import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

// workflow 节点数据 schema
export const subWorkflowNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("workflow"),
  inputs: z.array(basetFieldUISchema),
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    workflowId: z.object({
      type: z.literal("string"),
      value: z.string()
    }),
    version: z.object({
      type: z.literal("string"),
      value: z.string().optional()
    }),
    inputMappings: z.object({
      type: z.literal("array"),
      value: z.array(z.object({
        sourceField: z.string(),
        targetField: z.string(),
        desc: z.string().optional()
      }))
    }),
    outputMappings: z.object({
      type: z.literal("array"),
      value: z.array(z.object({
        sourceField: z.string(),
        targetField: z.string(),
        desc: z.string().optional()
      }))
    }),
    maxDepth: z.object({
      type: z.literal("number"),
      value: z.number().default(3)
    }),
    timeout: z.object({
      type: z.literal("number"),
      value: z.number().optional()
    }),
    allowFailure: z.object({
      type: z.literal("boolean"),
      value: z.boolean().default(false)
    }),
    retryCount: z.object({
      type: z.literal("number"),
      value: z.number().default(0)
    })
  })
});

// 默认数据示例
export const defaultWorkflowNodeData = {
  name: "CallSubWorkflow",
  type: "workflow",
  inputs: [],
  outputs: [
    {
      attrName: "executionStatus",
      label: "执行状态",
      type: "string",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "子工作流执行状态"
    },
    {
      attrName: "executionTime",
      label: "执行时间",
      type: "number",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "子工作流执行耗时"
    },
    {
      attrName: "executionMetadata",
      label: "执行详情",
      type: "object",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: null,
      desc: "子工作流执行元数据"
    }
  ],
  configs: {
    workflowId: {
      type: "string",
      value: ""
    },
    version: {
      type: "string",
      value: "latest"
    },
    inputMappings: {
      type: "array",
      value: [
        {
          sourceField: "$.PrevNode.outputs.data",
          targetField: "inputData",
          desc: "映射输入数据"
        }
      ]
    },
    outputMappings: {
      type: "array",
      value: [
        {
          sourceField: "result",
          targetField: "processedData",
          desc: "获取处理结果"
        }
      ]
    },
    maxDepth: {
      type: "number",
      value: 3
    },
    timeout: {
      type: "number",
      value: 60
    },
    allowFailure: {
      type: "boolean",
      value: false
    },
    retryCount: {
      type: "number",
      value: 0
    }
  }
};

export const workflowNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("workflow"),
  data: subWorkflowNodeDataUISchema,
})

// 类型导出
export type SubWorkflowNodeData = z.infer<typeof subWorkflowNodeDataUISchema>;
export type SubWorkflowNode = z.infer<typeof subWorkflowNodeDataUISchema>;