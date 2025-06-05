import { WorkflowEdge } from "./edge"
import { ReactFlowNodeConfig } from "./node"

export interface Graph {
    nodes: ReactFlowNodeConfig[]
    edges: WorkflowEdge[]
}

export type HandleType = {
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
};