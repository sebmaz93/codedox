export type BlockKind = "code" | "text";

export interface Block {
  id: string;
  kind: BlockKind;
  content: string;
}
