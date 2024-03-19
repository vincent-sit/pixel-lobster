import { OperationHistoryState } from './state';
import { Operation } from './type';

const OPERATION_HISTORY_LIMIT = 10;

export class OperationHistoryPresenter {
    constructor(private readonly canvas : HTMLCanvasElement) {}

    undo (state : OperationHistoryState) {
        if (state.pointer === -1) return;
        state.history[state.pointer].operate(this.canvas);
        state.pointer--;
        console.log(state.pointer);
    }

    redo (state : OperationHistoryState) {
        if (state.pointer === state.history.length - 1) return;
        state.history[state.pointer].operate(this.canvas);
        state.pointer++;
        console.log(state.pointer);
    }

    addToHistory(state : OperationHistoryState, operation : Operation) {
        if (state.history.length >= OPERATION_HISTORY_LIMIT) {
            state.history.splice(0, 1);
        }

        // if pointer is not at the end of the history, remove all history after the pointer
        const newHistory = state.history.splice(0, state.pointer + 1);
        state.history = newHistory;

        state.history.push(operation);
        state.pointer++;
        console.log(state.pointer);
    }

    clearHistory(state : OperationHistoryState) {
        state.history = [];
    }
}