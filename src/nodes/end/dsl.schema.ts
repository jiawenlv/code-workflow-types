import { z } from "zod";
import { baseFieldDSLSchema } from "../../common";

// 数据字段定义 - 支持嵌套结构
const createDataFieldSchema = (): z.ZodType<any> => z.object({
    type: z.enum(["string", "number", "boolean", "object", "array"]),
    value: z.string().optional(), // 可选的值引用
    desc: z.string(),
    properties: z.record(z.string(), z.lazy(() => createDataFieldSchema())).optional(), // 嵌套对象属性
    items: z.lazy(() => createDataFieldSchema()).optional(), // 数组元素类型
    enum: z.array(z.union([z.string(), z.number()])).optional(), // 枚举值
});

export const dataFieldSchema = createDataFieldSchema();

// API 响应数据结构 schema
export const apiResponseDataSchema = dataFieldSchema.refine((data) => {
    // 检查是否有value（顶层或任何子层级）
    const hasValue = (obj: any): boolean => {
        if (obj.value && obj.value.trim() !== "") return true;
        if (obj.properties) {
            return Object.values(obj.properties).some((prop: any) => hasValue(prop));
        }
        if (obj.items) {
            return hasValue(obj.items);
        }
        return false;
    };
    
    return hasValue(data);
}, {
    message: "data或其子级必须至少有一个value引用，确保有实际数据返回"
});

// End 节点 DSL schema
export const endNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("workflowEnd"),
    desc: z.string(),
    outputs: z.object({
        code: baseFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("响应状态码")
        }).default({
            type: "number" as const,
            desc: "响应状态码"
        }),
        data: apiResponseDataSchema,
        message: baseFieldDSLSchema.extend({
            type: z.literal("string"),
            desc: z.string().default("响应消息")
        }).default({
            type: "string" as const,
            desc: "响应消息"
        })
    })
});

// 类型导出
export type EndNodeDSL = z.infer<typeof endNodeDSLSchema>;
export type ApiResponseData = z.infer<typeof apiResponseDataSchema>;

// 验证函数
export const validateEndNodeDSL = (data: unknown): EndNodeDSL => {
    return endNodeDSLSchema.parse(data);
};

// 示例数据 - 简单对象返回（顶层有value，无需定义内部结构）
export const exampleEndNodeDSL: EndNodeDSL = {
    name: "End",
    type: "workflowEnd",
    desc: "工作流结束节点",
    outputs: {
        code: {
            type: "number",
            value: "200",
            desc: "HTTP状态码"
        },
        data: {
            type: "object",
            value: "$.ProcessResult.outputs.result",
            desc: "业务处理结果（完整对象数据）"
        },
        message: {
            type: "string",
            value: "操作成功",
            desc: "响应消息"
        }
    }
};

// 示例数据 - 分段构建的数据结构（子级有value）
export const exampleEndNodeComposedDSL: EndNodeDSL = {
    name: "End",
    type: "workflowEnd",
    desc: "工作流结束节点 - 组合数据",
    outputs: {
        code: {
            type: "number",
            value: "200",
            desc: "HTTP状态码"
        },
        data: {
            type: "object",
            desc: "分页查询结果",
            properties: {
                list: {
                    type: "array",
                    value: "$.QueryUsers.outputs.data",
                    desc: "用户列表数据"
                },
                total: {
                    type: "number",
                    value: "$.CountUsers.outputs.affected",
                    desc: "用户总数"
                },
                page: {
                    type: "number",
                    value: "$.GetPage.outputs.page",
                    desc: "当前页码"
                },
                pageSize: {
                    type: "number",
                    value: "10",
                    desc: "每页大小"
                }
            }
        },
        message: {
            type: "string",
            value: "查询成功",
            desc: "响应消息"
        }
    }
};

// 示例数据 - 创建操作返回（组合不同节点数据）
export const exampleEndNodeCreateDSL: EndNodeDSL = {
    name: "End",
    type: "workflowEnd",
    desc: "工作流结束节点 - 创建操作",
    outputs: {
        code: {
            type: "number",
            value: "201",
            desc: "HTTP状态码"
        },
        data: {
            type: "object",
            desc: "创建结果",
            properties: {
                id: {
                    type: "string",
                    value: "$.CreateUser.outputs.insertId",
                    desc: "新创建的用户ID"
                },
                createdAt: {
                    type: "string",
                    value: "$.GetCurrentTime.outputs.timestamp",
                    desc: "创建时间"
                }
            }
        },
        message: {
            type: "string",
            value: "用户创建成功",
            desc: "响应消息"
        }
    }
};

// 示例数据 - 字符串数据返回
export const exampleEndNodeStringDSL: EndNodeDSL = {
    name: "End",
    type: "workflowEnd",
    desc: "工作流结束节点 - 字符串数据",
    outputs: {
        code: {
            type: "number",
            value: "200",
            desc: "HTTP状态码"
        },
        data: {
            type: "string",
            value: "$.CreateUser.outputs.insertId",
            desc: "新创建的用户ID"
        },
        message: {
            type: "string",
            value: "操作成功",
            desc: "响应消息"
        }
    }
};

// 示例数据 - 删除操作返回（简单确认）
export const exampleEndNodeDeleteDSL: EndNodeDSL = {
    name: "End",
    type: "workflowEnd",
    desc: "工作流结束节点 - 删除操作",
    outputs: {
        code: {
            type: "number",
            value: "200",
            desc: "HTTP状态码"
        },
        data: {
            type: "string",
            value: "删除成功",
            desc: "操作结果确认"
        },
        message: {
            type: "string",
            value: "数据删除成功",
            desc: "响应消息"
        }
    }
}; 