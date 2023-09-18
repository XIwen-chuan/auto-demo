export interface Line {
  stroke: string;
}

export interface Attr {
  line: Line;
}

export interface Source {
  cell: string;
  port: string;
}

export interface Target {
  cell: string;
  port: string;
}

export interface Cell {
  shape: string;
  attrs: Attr;
  id: string;
  zIndex: number;
  source: Source;
  target: Target;
}

export interface GraphM {
  cells: Cell[];
}
