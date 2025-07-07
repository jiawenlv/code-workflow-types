import { z } from "zod";
import { baseFieldDSLSchema } from "../../common";

// 代码类型字段 schema
const codeFieldSchema = baseFieldDSLSchema.extend({
    type: z.literal("code"),
    value: z.string(),
});

// 代码节点输入字段 schema - 扩展通用输入字段以包含代码类型
const codeInputFieldSchema = z.union([
    codeFieldSchema,
    baseFieldDSLSchema, // 其他类型
]);

// Code 节点 DSL schema
export const codeNodeDSLSchema = z.object({
    name: z.string(),
    type: z.literal("code"),
    desc: z.string(),
    inputs: z.record(z.string(), codeInputFieldSchema),
    outputs: z.record(z.string(), baseFieldDSLSchema),
    configs: z.object({
        dependencies: z.array(z.string()).default([]),
        file: z.object({
            name: z.string(),
            content: z.string(),
        })
    }),
    nextNodes: z.array(z.string())
});

// 类型导出
export type CodeField = z.infer<typeof codeFieldSchema>;
export type CodeInputField = z.infer<typeof codeInputFieldSchema>;
export type CodeNodeDSL = z.infer<typeof codeNodeDSLSchema>;

// 验证函数
export const validateCodeNodeDSL = (data: unknown): CodeNodeDSL => {
    return codeNodeDSLSchema.parse(data);
};

// 示例数据
export const exampleCodeNodeDSL: CodeNodeDSL = {
    name: "ProcessUserData",
    type: "code",
    desc: "处理用户数据并进行业务逻辑计算",
    inputs: {
        userId: {
            type: "string",
            value: "$.GetUser.outputs.id",
            desc: "用户ID"
        },
        userData: {
            type: "object",
            value: "$.GetUser.outputs.data",
            desc: "用户原始数据"
        },
        config: {
            type: "object",
            value: "$.GetConfig.outputs.settings",
            desc: "处理配置"
        }
    },
    outputs: {
        processedData: {
            type: "object",
            value: "$.ProcessUserData.result.processedData",
            desc: "处理后的用户数据"
        },
        isValid: {
            type: "boolean",
            value: "$.ProcessUserData.result.isValid",
            desc: "数据是否有效"
        },
        errorMessage: {
            type: "string",
            value: "$.ProcessUserData.result.errorMessage",
            desc: "错误信息（如果有）"
        },
        score: {
            type: "number",
            value: "$.ProcessUserData.result.score",
            desc: "计算得分"
        }
    },
    configs: {
        dependencies: ["lodash", "dayjs"],
        file: {
            name: "processUserData.js",
            content: "import _ from 'lodash';\nimport dayjs from 'dayjs';\n\nexport default function main(inputs) {\n    const { userId, userData, config } = inputs;\n    \n    try {\n        const processedData = {\n            id: userId,\n            name: _.capitalize(userData.name),\n            email: userData.email.toLowerCase(),\n            processedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')\n        };\n        \n        const isValid = userData.age >= 18 && userData.email.includes('@');\n        let score = userData.age >= 18 ? 20 : 0;\n        \n        return {\n            processedData,\n            isValid,\n            errorMessage: isValid ? null : '数据验证失败',\n            score\n        };\n    } catch (error) {\n        return {\n            processedData: null,\n            isValid: false,\n            errorMessage: error.message,\n            score: 0\n        };\n    }\n}"
        }
    },
    nextNodes: ["CheckResult"]
};


