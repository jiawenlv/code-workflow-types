import { z } from "zod";
import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

// LLM 节点 DSL schema
export const llmNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("chatWithLLM"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.object({
        thinking: builtinOutputFieldDSLSchema.extend({
            type: z.literal("string"),
            desc: z.string().default("AI思考过程")
        }).default({
            type: "string" as const,
            desc: "AI思考过程"
        }),
        response: builtinOutputFieldDSLSchema.extend({
            type: z.literal("string"),
            desc: z.string().default("AI生成的回复")
        }).default({
            type: "string" as const,
            desc: "AI生成的回复"
        }),
        tokens: builtinOutputFieldDSLSchema.extend({
            type: z.literal("object"),
            desc: z.string().default("Token使用情况")
        }).default({
            type: "object" as const,
            desc: "Token使用情况"
        })
    }),
    configs: z.object({
        modelId: z.string(),
        systemPrompt: z.string().optional(),
        temperature: z.number().min(0).max(2).optional(),
        maxTokens: z.number().positive().optional(),
        topP: z.number().min(0).max(1).optional(),
        frequencyPenalty: z.number().min(-2).max(2).optional(),
        presencePenalty: z.number().min(-2).max(2).optional(),
    }),
    nextNodes: z.array(z.string())
});

// 类型导出
export type LLMNodeDSL = z.infer<typeof llmNodeDSLSchema>;

// 验证函数
export const validateLLMNodeDSL = (data: unknown): LLMNodeDSL => {
    return llmNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleLLMNodeDSL: LLMNodeDSL = {
    name: "GenerateResponse",
    type: "chatWithLLM",
    desc: "生成AI回复",
    inputs: {
        userInput: {
            type: "string",
            value: "$.GetMessage.outputs.message",
            desc: "用户输入"
        }
    },
    outputs: {
        thinking: {
            type: "string",
            desc: "AI思考过程"
        },
        response: {
            type: "string",
            desc: "AI生成的回复"
        },
        tokens: {
            type: "object",
            desc: "Token使用情况"
        }
    },
    configs: {
        modelId: "gpt-4",
        temperature: 0.7,
        systemPrompt: "你是一个有用的AI助手"
    },
    nextNodes: ["ProcessReply"]
}; 