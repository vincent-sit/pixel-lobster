import { proxy } from "valtio";
import { Action } from "./type";
import { ClearAction } from "../clear-canvas/action";

export class ActionHistoryState {
    pointer : number = 0;
    history : Action[] = [new ClearAction('')];
}

export function createActionHistoryState() {
    return proxy(new ActionHistoryState());
}
