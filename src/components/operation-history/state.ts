import { proxy } from "valtio";
import { Operation } from "./type";
import { ClearOperation } from "./clear/operation";

export class OperationHistoryState {
    pointer : number = -1;
    history : Operation[] = [new ClearOperation('')];
}

export function createOperationHistoryState() {
    return proxy(new OperationHistoryState());
}
