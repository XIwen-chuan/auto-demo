export interface searchResM {
  took: number;
  timed_out: number;
  hits: searchHitsListM;
}

export interface searchHitsListM {
  max_score: number;
  hits: searchHitM[];
}

export interface searchHitM {
  _index: string;
  _id: string;
  _score: number;
  _source: {
    name: string;
    procedure: string;
  };
}

export interface nodeM {
  id: number | string;
  operation: string;
  attrs: [];
  protocolText: string;
}

export interface attrM {
  id: number | string;
  key: string;
  value: string;
}

export interface edgeM {
  id: number | string;
  content: string;
  targetAttrId: number | string;
  sourceAttrId: number | string;
}
