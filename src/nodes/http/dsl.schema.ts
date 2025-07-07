import { z } from "zod";
import { baseFieldDSLSchema, builtinOutputFieldDSLSchema } from "../../common";

// HTTP请求配置 DSL schema
export const httpConfigDSLSchema = z.object({
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    url: z.string(),
    timeout: z.number().positive().default(30),
    params: z.record(z.string(), z.string()).optional(), // 路径参数，对象形式 {key: value}
    queryParams: z.record(z.string(), z.string()).optional(), // 查询参数，对象形式 {key: value}
    headers: z.record(z.string(), z.string()).optional(), // 请求头，对象形式 {key: value}
    bodyType: z.enum(["none", "json", "form-data", "text"]).default("none"),
    body: z.string().optional(), // 请求体内容，统一为字符串
});

// HTTP请求节点 DSL schema
export const httpNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("http"),
    desc: z.string(),
    inputs: z.record(z.string(), baseFieldDSLSchema),
    outputs: z.object({
        code: builtinOutputFieldDSLSchema.extend({
            type: z.literal("number"),
            desc: z.string().default("HTTP状态码")
        }).default({
            type: "number" as const,
            desc: "HTTP状态码"
        }),
        data: builtinOutputFieldDSLSchema.extend({
            type: z.literal("object"),
            desc: z.string().default("响应数据")
        }).default({
            type: "object" as const,
            desc: "响应数据"
        }),
        message: builtinOutputFieldDSLSchema.extend({
            type: z.literal("string"),
            desc: z.string().default("响应消息")
        }).default({
            type: "string" as const,
            desc: "响应消息"
        })
    }),
    configs: httpConfigDSLSchema,
    nextNodes: z.array(z.string()),
});

// 类型导出
export type HttpNodeDSL = z.infer<typeof httpNodeDSLSchema>; 


// 示例数据
export const exampleHttpNodeDSL: HttpNodeDSL = {
    name: "CallAPI",
    type: "http",
    desc: "调用外部API",
    inputs: {
        userId: {
            type: "string",
            value: "$.GetUserData.outputs.userId",
            desc: "用户ID"
        }
    },
    outputs: {
        code: {
            type: "number",
            desc: "HTTP状态码"
        },
        data: {
            type: "object",
            desc: "响应数据"
        },
        message: {
            type: "string",
            desc: "响应消息"
        }
    },
    configs: {
        method: "GET",
        url: "https://api.example.com/users/:userId",
        params: {
            "userId": "$.CallAPI.inputs.userId"
        },
        timeout: 30,
        bodyType: "none"
    },
    nextNodes: ["ProcessResponse"]
};

