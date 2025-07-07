import { z } from "zod";
import { baseNodeUIchema, basetFieldUISchema } from "../../common";


// code 节点数据 schema
export const codeNodeDataUISchema = z.object({
  name: z.string(),
  type: z.literal("code"),
  inputs: z.array(basetFieldUISchema),
  outputs: z.array(basetFieldUISchema),
  configs: z.object({
    dependencies: z.object({
      type: z.literal("dependencies"),
      value: z.record(z.string(), z.string())
    }),
    file: z.object({
      type: z.literal("codeFile"),
      value: z.object({
        name: z.string(),
        content: z.string(),
      })
    })
  })
});



// 默认数据示例
export const defaultCodeNodeData = {
  label: "代码",
  inputs: [],
  outputs: [
    {
      type: "string",
      name: "result",
      value: ""
    }
  ],
  configs: {
    file: {
      type: "codeFile",
      value: {
        name: "",
        content: ""
      }
    },
  }
};

export const codeNodeUISchema = baseNodeUIchema.extend({
  type: z.literal("code"),
  data: codeNodeDataUISchema,
})

// 类型导出
export type CodeNodeData = z.infer<typeof codeNodeDataUISchema>;
export type CodeNode = z.infer<typeof codeNodeUISchema>;
