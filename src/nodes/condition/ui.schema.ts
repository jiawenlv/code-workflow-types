import { baseNodeUIchema, basetFieldUISchema } from "../../common";

import { z } from "zod";

// 单个条件 schema
export const singleConditionUISchema = z.object({
    left: z.object({
        valuePath: z.string(), // 使用字符串路径格式，如 "$currentNode.inputs.userType"
        valueLabelPath: z.array(z.string()),
    }),
    operator: z.enum([
        "equal", "notEqual", "greaterThan", "greaterThanEqual", 
        "lessThan", "lessThanEqual", "isNull", "isNotNull", 
        "include", "notInclude"
    ]),
    right: z.object({
        value: z.any(),
    }),
});

// 条件组 schema
export const conditionGroupUISchema = z.object({
    relationship: z.enum(["AND", "OR"]),
    conditions: z.array(singleConditionUISchema),
    nextNode: z.string(),
    desc: z.string().optional(),
});

// condition 节点数据 schema
export const conditionNodeDataUISchema = z.object({
    inputs: z.array(basetFieldUISchema),
    outputs: z.array(basetFieldUISchema),
    type: z.literal("condition"),
    name: z.string(),
    configs: z.object({
        conditionGroups: z.array(conditionGroupUISchema),
        groupRelationship: z.enum(["AND", "OR"]).optional(),
        defaultNextNode: z.string().optional(),
    }),
    
});

// 默认数据示例
export const defaultConditionNodeData: ConditionNodeData = {
    name: "condition",
    type: "condition",
    inputs: [],
    outputs: [],
    configs: {
        conditionGroups: [
            {
                relationship: "AND",
                conditions: [
                    {
                        left: {
                            valuePath: "$currentNode.inputs.value",
                            valueLabelPath: ["值"]
                        },
                        operator: "greaterThan",
                        right: {
                            value: 0
                        }
                    }
                ],
                nextNode: "nextNode1",
                desc: "第一个条件组"
            }
        ],
        groupRelationship: "OR",
        defaultNextNode: "defaultNode"
    },
};

export const conditionNodeUISchema = baseNodeUIchema.extend({
    type: z.literal("condition"),
    data: conditionNodeDataUISchema,
});

// 类型导出
export type SingleConditionUI = z.infer<typeof singleConditionUISchema>;
export type ConditionGroupUI = z.infer<typeof conditionGroupUISchema>;
export type ConditionNodeData = z.infer<typeof conditionNodeDataUISchema>;
export type ConditionNode = z.infer<typeof conditionNodeUISchema>; 