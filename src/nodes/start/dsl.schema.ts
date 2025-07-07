import { z } from "zod";
import { baseFieldDSLSchema } from "../../common";

// Start 节点 DSL schema
export const startNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("workflowStart"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    nextNodes: z.array(z.string()),
});

// 类型导出
export type StartNodeDSL = z.infer<typeof startNodeDSLSchema>;

// 验证函数
export const validateStartNodeDSL = (data: unknown): StartNodeDSL => {
    return startNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleStartNodeDSL: StartNodeDSL = {
    name: "Start",
    type: "workflowStart",
    desc: "工作流开始节点",
    inputs: {
        userId: {
            type: "string",
            value: "123",
            desc: "用户ID"
        }
    },
    nextNodes: ["ProcessUser"]
}; 