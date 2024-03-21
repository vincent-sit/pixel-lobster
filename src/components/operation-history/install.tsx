import React from 'react';
import { OperationHistoryPresenter } from './presenter';
import { createOperationHistoryState } from './state';
import { Action } from './type';
import { UndoButton as InternalUndoButton } from './button/undo-button';
import { RedoButton as InternalRedoButton } from './button/redo-button';

export function installOperationHistory(canvas : HTMLCanvasElement) {
    const state = createOperationHistoryState();
    const presenter = new OperationHistoryPresenter(canvas);

    const undo  = () => presenter.undo(state);
    const redo = () => presenter.redo(state);
    const addToHistory = (operation : Action) => presenter.addToHistory(state, operation);
    const clearHistory = () => presenter.clearHistory(state);

    const UndoButton = () => {
        return (
            <InternalUndoButton onClick={undo}/>
        );
    }

    const RedoButton = () => {
        return (
            <InternalRedoButton onClick={redo}/>
        );
    }

    return {
        UndoButton,
        RedoButton,
        addToHistory,
        clearHistory
    }
}