import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";


// HTTP请求配置 schema
export const httpConfigSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  url: z.string(),
  timeout: z.number(),
  params: z.record(z.string(), z.string()).optional(),
  queryParams: z.record(z.string(), z.string()).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  bodyType: z.enum(["none", "json", "form-data", "text"]),
  body: z.string().optional(),
});

// http 节点数据 schema
export const httpNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("http"),
  inputs: z.array(basetFieldUISchema),
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    config: z.object({
      type: z.literal("httpOptions"),
      value: httpConfigSchema,
    }),
  }),
});

// 默认数据示例
export const defaultHttpNodeData = {
  label: "HTTP 请求",
  inputs: [],
  outputs: [
    {
      attrName: "result",
      label: "结果",
      removable: true,
      editable: true,
      valueType: "string",
      isDynamic: true,
      valuePath: [],
      valueLabelPath: [],
      value: "",
    },
  ],
  configs: {
    method: {
      type: "string",
      value: "GET",
    },
    url: {
      type: "string",
      value: "",
    },
    timeout: {
      type: "number",
      value: 30,
    },
    params: {
      type: "object",
      value: {},
    },
    queryParams: {
      type: "object",
      value: {},
    },
    headers: {
      type: "object",
      value: {},
    },
    bodyType: {
      type: "string",
      value: "none",
    },
    body: {
      type: "string",
      value: "",
    },
  },
};

export const httpNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("http"),
  data: httpNodeDataUISchema,
});

// 类型导出
export type HttpNodeData = z.infer<typeof httpNodeDataUISchema>;
export type HttpNode = z.infer<typeof httpNodeUISchema>; 