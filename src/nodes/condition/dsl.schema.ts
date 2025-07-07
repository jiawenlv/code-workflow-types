import { baseFieldDSLSchema } from "../../common";

import { z } from "zod";

// 条件表达式字段 schema
const conditionExpressionSchema = baseFieldDSLSchema.extend({
    type: z.literal("string"),
    value: z.string(),
});

// 条件节点输入字段 schema
const conditionInputFieldSchema = z.union([
    conditionExpressionSchema,
    baseFieldDSLSchema, // 其他类型
]);

// 单个条件 schema
const singleConditionSchema = z.object({
    left: z.string(),
    operator: z.enum([
        "equal", "notEqual", "greaterThan", "greaterThanEqual", 
        "lessThan", "lessThanEqual", "isNull", "isNotNull", 
        "include", "notInclude"
    ]),
    right: z.string(),
});

// 条件组 schema - 支持 AND/OR 逻辑关系
const conditionGroupSchema = z.object({
    relationship: z.enum(["AND", "OR"]), // 条件组内条件的关系
    conditions: z.array(singleConditionSchema),
    nextNode: z.string(),
    desc: z.string().optional(),
});

// Condition 节点 DSL schema
export const conditionNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("condition"),
    desc: z.string(),
    inputs: z.record(z.string(), conditionInputFieldSchema),
    configs: z.object({
        conditionGroups: z.array(conditionGroupSchema), // 条件组数组
        groupRelationship: z.enum(["AND", "OR"]).optional(), // 条件组之间的关系
        defaultNextNode: z.string().optional(),
    }),
    nextNodes: z.array(z.string())
});

// 类型导出
export type ConditionExpression = z.infer<typeof conditionExpressionSchema>;
export type ConditionInputField = z.infer<typeof conditionInputFieldSchema>;
export type SingleCondition = z.infer<typeof singleConditionSchema>;
export type ConditionGroup = z.infer<typeof conditionGroupSchema>;
export type ConditionNodeDSL = z.infer<typeof conditionNodeDSLSchema>;

// 验证函数
export const validateConditionNodeDSL = (data: unknown): ConditionNodeDSL => {
    return conditionNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleConditionNodeDSL: ConditionNodeDSL = {
    name: "CheckUserType",
    type: "condition",
    desc: "检查用户类型",
    inputs: {
        userType: {
            type: "string",
            value: "$.GetUserInfo.outputs.userType",
            desc: "用户类型"
        }
    },
    configs: {
        conditionGroups: [
            {
                relationship: "AND",
                conditions: [
                    {
                        left: "$.CheckUserType.inputs.userType",
                        operator: "equal",
                        right: "vip"
                    }
                ],
                nextNode: "VipProcess"
            }
        ],
        defaultNextNode: "NormalProcess"
    },
    nextNodes: ["VipProcess", "NormalProcess"]
}; 