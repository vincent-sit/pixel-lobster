import { ClearOperation } from './clear/operation';
import { OperationHistoryState } from './state';
import { Operation } from './type';

const OPERATION_HISTORY_LIMIT = 10;

export class OperationHistoryPresenter {
    constructor(private readonly canvas : HTMLCanvasElement) {}

    undo (state : OperationHistoryState) {
        state.pointer--;
        if (state.pointer === -1) {
            state.pointer = 0;
            return;
        }
        state.history[state.pointer].operate(this.canvas);
    }

    redo (state : OperationHistoryState) {
        state.pointer++;
        if (state.pointer === state.history.length) {
            state.pointer = state.history.length - 1;
            return;
        }
        state.history[state.pointer].operate(this.canvas);
    }

    addToHistory(state : OperationHistoryState, operation : Operation) {
        state.pointer++;
        if (state.history.length >= OPERATION_HISTORY_LIMIT) {
            state.history.splice(0, 1);
        }

        // if pointer is not at the end of the history, remove all history after the pointer
        const newHistory = state.history.splice(0, state.pointer);
        state.history = newHistory;

        state.history.push(operation);
    }

    clearHistory(state : OperationHistoryState) {
        state.history = [new ClearOperation('')];
    }
}