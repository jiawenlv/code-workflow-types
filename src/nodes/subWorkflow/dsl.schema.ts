import { z } from "zod";

// 参数映射 schema
export const parameterMappingSchema = z.object({
    sourceField: z.string(), // 来源字段路径，如 "$prevNode.outputs.data"
    targetField: z.string(), // 目标字段名
    desc: z.string().optional()
});

// 工作流引用 schema（已合并到主配置中）

// Workflow 节点 DSL schema（简化版）
export const workflowNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("workflow"),
    desc: z.string(),
    configs: z.object({
        // 工作流基本信息
        workflowId: z.string(), // 引用的工作流ID
        version: z.string().optional(), // 工作流版本，默认为latest
        
        // 参数映射
        inputMappings: z.array(parameterMappingSchema), // 输入参数映射
        outputMappings: z.array(parameterMappingSchema), // 输出参数映射
        
        // 执行控制
        maxDepth: z.number().max(5).default(3), // 最大嵌套深度限制
        timeout: z.number().positive().optional(), // 执行超时时间（秒）
        allowFailure: z.boolean().default(false), // 是否允许子工作流失败继续执行
        retryCount: z.number().min(0).max(3).default(0), // 重试次数
        parallel: z.boolean().default(false) // 是否并行执行（如果有多个工作流引用）
    }),
    nextNodes: z.array(z.string())
});

// 类型导出
export type SubWorkflowNodeDSL = z.infer<typeof workflowNodeDSLSchema>;
export type ParameterMapping = z.infer<typeof parameterMappingSchema>;

// 验证函数
export const validateSubWorkflowNodeDSL = (data: unknown): SubWorkflowNodeDSL => {
    return workflowNodeDSLSchema.parse(data);
};

// 示例数据（简化版）
export const exampleSubWorkflowNodeDSL: SubWorkflowNodeDSL = {
    name: "ProcessOrderWorkflow",
    type: "workflow",
    desc: "调用订单处理子工作流",
    configs: {
        // 工作流基本信息
        workflowId: "order-processing-v2",
        version: "1.2.0",
        
        // 输入参数映射
        inputMappings: [
            {
                sourceField: "$prevNode.outputs.orderInfo",
                targetField: "orderData",
                desc: "映射订单数据到子工作流"
            },
            {
                sourceField: "$prevNode.outputs.userId", 
                targetField: "customerId",
                desc: "映射用户ID到客户ID"
            }
        ],
        
        // 输出参数映射
        outputMappings: [
            {
                sourceField: "processedOrder",
                targetField: "processedOrder",
                desc: "获取处理后的订单信息"
            },
            {
                sourceField: "orderStatus",
                targetField: "status",
                desc: "获取订单状态"
            }
        ],
        
        // 执行控制
        maxDepth: 3,
        timeout: 30,
        allowFailure: false,
        retryCount: 1,
        parallel: false
    },
    nextNodes: ["SendNotification"]
};