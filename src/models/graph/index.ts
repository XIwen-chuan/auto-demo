export enum AttributeM {
  slot = "slot",
  emit = "emit",
}
export interface Slot {
  key: string;
  value: string;
  id: string;
  node_id: string;
}

export interface Emit {
  key: string;
  value: string;
  id: string;
  node_id: string;
}

export interface Node {
  id: string;
  text: string;
  instruction: string;
  relatedEdges?: Edge[];
  slots: Slot[];
  emits: Emit[];
}

export interface Source {
  text?: string;
  node_id: string;
  attr_id: string;
}

export interface Target {
  text?: string;
  node_id: string;
  attr_id: string;
}

export interface Edge {
  id: string;
  source: Source;
  target: Target;
  text: string;
}

export interface GraphM {
  name: string;
  nodes: Node[];
  edges: Edge[];
}
