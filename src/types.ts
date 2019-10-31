export interface InlineToken {
  type: string,
  value: string,
  terminal?: boolean,
  original?: string,
  delimiter?: string,
  metadata?: Record<any, any>
}

export interface BlockToken {
  type: string,
  value?: string,
  terminal?: boolean,
  metadata?: Record<any, any>
}

export interface Node {
  type: string,
  data?: Record<any, any>
}

export type Ast = Node[];