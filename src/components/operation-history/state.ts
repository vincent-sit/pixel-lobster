import { proxy } from "valtio";
import { Action } from "./type";
import { ClearAction } from "../clear-canvas/action";

export class OperationHistoryState {
    pointer : number = 0;
    history : Action[] = [new ClearAction('')];
}

export function createOperationHistoryState() {
    return proxy(new OperationHistoryState());
}
