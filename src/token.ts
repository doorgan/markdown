export interface Token {
  type: string,
  terminal: boolean,
  value: string,
  original: string,
  delimiter?: string
}