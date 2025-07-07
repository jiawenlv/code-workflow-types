import { z } from "zod";

export const baseFieldDSLSchema = z.object({
    type: z.string(),
    value: z.any(),
    desc: z.string().optional(),
});

// 内置输出字段schema，不包含value字段（由系统自动设置）
export const builtinOutputFieldDSLSchema = z.object({
    type: z.string(),
    desc: z.string().optional(),
    value: z.any().optional(),
});


export const basetFieldUISchema = z.object({
    id: z.string(),
    attrName: z.string(),
    label: z.string().optional(),
    type: z.string(),
    isDynamic: z.boolean(),
    valuePath: z.array(z.string()),
    valueLabelPath: z.array(z.string()),
    value: z.any().nullable(),
    desc: z.string().optional(),
});


// 位置 schema
export const nodePositionSchema = z.object({
    x: z.number(),
    y: z.number(),
});

// 尺寸 schema
export const nodeMeasuredSchema = z.object({
    width: z.number(),
    height: z.number(),
});

// code 节点实例 schema
export const baseNodeUIchema = z.object({
    id: z.string(),
    type: z.string(),
    position: nodePositionSchema,
    data: z.any(),
    measured: nodeMeasuredSchema.optional(),
    selected: z.boolean().optional().default(false),
    dragging: z.boolean().optional().default(false),
});

// 通用节点配置接口
export interface NodeConfig {
  inputs?: any[];
  outputs?: any[];
  label?: string;
  hasCustomHandle?: boolean;
  conditions?: any[];
}

// 节点渲染器接口
export interface NodeRenderer {
  (props: any): any;
}