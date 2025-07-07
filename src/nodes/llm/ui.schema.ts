import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";

// LLM 节点数据 schema
export const llmNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("chatWithLLM"),
  inputs: z.array(basetFieldUISchema), 
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    modelId: z.object({
      type: z.literal("modelId"),
      value: z.string()
    }),
    temperature: z.object({
      type: z.literal("number"),
      value: z.number().min(0).max(2)
    }),
    maxTokens: z.object({
      type: z.literal("number"),
      value: z.number().positive()
    }),
    topP: z.object({
      type: z.literal("number"),
      value: z.number().min(0).max(1)
    }),
    frequencyPenalty: z.object({
      type: z.literal("number"),
      value: z.number().min(-2).max(2)
    }),
    presencePenalty: z.object({
      type: z.literal("number"),
      value: z.number().min(-2).max(2)
    }),
    systemPrompt: z.object({
      type: z.literal("longText"),
      value: z.string()
    })
  })
});

// 默认数据示例
export const defaultLLMNodeData = {
  label: "LLM对话",
  inputs: [
    {
      attrName: "userInput",
      type: "array",
      desc: "用户输入内容",
      isDynamic: true,
      valuePath: [0],
      valueLabelPath: [0],
      value: []
    }
  ],
  outputs: [
    {
      attrName: "result",
      type: "string",
      isDynamic: false,
      valuePath: [],
      valueLabelPath: [],
      value: "",
      desc: "LLM生成的回复"
    }
  ],
  configs: {
    modelId: {
      type: "modelId",
      value: "gpt-4"
    },
    temperature: {
      type: "number",
      value: 0.7
    },
    maxTokens: {
      type: "number",
      value: 1000
    },
    topP: {
      type: "number",
      value: 0.9
    },
    frequencyPenalty: {
      type: "number",
      value: 0
    },
    presencePenalty: {
      type: "number",
      value: 0
    },
    systemPrompt: {
      type: "longText",
      value: "你是一个有用的AI助手。"
    },
    userPrompt: {
      type: "longText",
      value: "请回答用户的问题：{{userInput}}"
    },
  }
};

export const llmNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("chatWithLLM"),
  data: llmNodeDataUISchema,
})

// 类型导出
export type LLMNodeData = z.infer<typeof llmNodeDataUISchema>;
export type LLMNode = z.infer<typeof llmNodeUISchema>; 