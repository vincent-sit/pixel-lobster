import { proxy } from "valtio";
import { Operation } from "./type";

export class OperationHistoryState {
    pointer : number = -1;
    history : Operation[] = [];
}

export function createOperationHistoryState() {
    return proxy(new OperationHistoryState());
}
