import { ClearAction } from '../clear-canvas/action';
import { ActionHistoryState } from './state';
import { Action } from './type';

const OPERATION_HISTORY_LIMIT = 10;

export class OperationHistoryPresenter {
    constructor(private readonly canvas : HTMLCanvasElement) {}

    undo (state : ActionHistoryState) {
        state.pointer--;
        if (state.pointer === -1) {
            state.pointer = 0;
            return;
        }
        state.history[state.pointer].undo(this.canvas);
    }

    redo (state : ActionHistoryState) {
        state.pointer++;
        if (state.pointer === state.history.length) {
            state.pointer = state.history.length - 1;
            return;
        }
        state.history[state.pointer].redo(this.canvas);
    }

    addToHistory(state : ActionHistoryState, operation : Action) {
        state.pointer++;
        if (state.history.length >= OPERATION_HISTORY_LIMIT) {
            state.history.splice(0, 1);
        }

        // if pointer is not at the end of the history, remove all history after the pointer
        const newHistory = state.history.splice(0, state.pointer);
        state.history = newHistory;

        state.history.push(operation);
    }

    clearHistory(state : ActionHistoryState) {
        state.history = [new ClearAction('')];
    }
}