import { WorkflowOutputTypeEnum, WorkflowRuntimeStatusEnum, NodeTypeEnum,WorkflowIOValueTypeEnum  } from "./enums";

// 工作流画布
export interface Graph {
    nodes: ReactFlowNodeConfig[]
    edges: WorkflowEdge[]
}

// 工作流边
export interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
}

// 工作流节点
export interface ReactFlowNodeConfig<T = any> {
    // 节点 id
    id: string;

    // 节点类型
    type: NodeTypeEnum;

    // 节点数据
    data: T

    // 位置
    position: {
        // 横坐标
        x: number;
        // 纵坐标
        y: number;
    };

    measured?: {
        // 宽度
        width: number,
        // 高度
        height: number
    },

    // 是否有错误
    isError?: boolean;

    // 是否选中
    selected?: boolean;

    // 是否处于拖动状态
    dragging?: boolean;
}

export type WorkflowData = {
    // 节点标签
    label: string;
    showInputs: boolean;
    showOutputs: boolean;

    // 是否自定义 handle
    hasCustomHandle?: boolean;
    // 节点输入
    inputs?: WorkflowNodeInputField[];
    // 节点输出
    outputs?: WorkflowNodeInputField[];

    // TODO: 节点配置
    configs: any;
    
    // 子节点列表
    children?: WorkflowNode[];

    // 子节点
    child?: WorkflowNode;
    
    // 其他配置
    [key: string]: any;
}

export interface WorkflowNodeIOFieldBase {
    id: string;
    attrName: string;
    valueType: WorkflowIOValueTypeEnum;
    isDynamic: boolean;
    label: string;
    removable: boolean;
    editable: boolean;
    desc?: string;
    value?: any;
    valuePath?: string[];
    valueLabelPath?: string[];
    required?: boolean;
    defaultValue?: any;
}

export type WorkflowNodeInputField = WorkflowNodeIOFieldBase & {};

export type WorkflowNodeOuputField = WorkflowNodeIOFieldBase & {};

// 工作流把手
export type HandleType = {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
};


export type WorkflowNode = ReactFlowNodeConfig<WorkflowData>;



// 工作流运行时上下文
export interface WorkflowRuntimeContext {
    nodeInputs: Record<string, Record<string, any>>;
    nodeOutputs: Record<string, Record<string, any>>;
    nodeStatus: Record<string, WorkflowRuntimeStatusEnum>;
    inputs: Record<string, any>;
    outputs: Record<string, any>;
    results: Record<string, any>;
    outputChanel: Output
}

export interface Output {
    text?: (text: string) => void
    json?: (json: WorkflowOutputJSON) => void
}

export interface WorkflowOutputJSON {
    type: WorkflowOutputTypeEnum
    content: any
}
