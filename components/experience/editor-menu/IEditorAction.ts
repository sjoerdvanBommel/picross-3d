import { PicrossPointerEvent } from "./PicrossPointerEvent";

export interface IEditorAction {
  getAction(pointerEvent: PicrossPointerEvent): IEditorAction | null;
  getMouseIcon(active: IEditorAction): string;
}