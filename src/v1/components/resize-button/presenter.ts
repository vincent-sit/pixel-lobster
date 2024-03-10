export class ResizeCanvasPresenter {
    showModal(getDialog : () => HTMLElement | null) {
        const dialog = getDialog();
        if (!dialog || !(dialog instanceof HTMLDialogElement)) return;
        dialog.showModal();
    }
}
