/**
 * Shared confirm dialog (admin phase 3) — replaces window.confirm so
 * destructive actions get a themed, a11y-labelled prompt that can require
 * typing a slug before an irreversible purge. The <dialog> is injected once
 * per page; its look lives in Admin.astro's global style block. The backend
 * stays the real gate — this only hardens the UI affordance.
 */
import { el } from "./api";

export interface ConfirmOpts {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  /** Require typing this exact string (usually the item slug) to enable confirm. */
  requireText?: string;
}

let dlg: HTMLDialogElement | null = null;

function ensureDialog(): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement("dialog");
  dlg.id = "confirm-dlg";
  dlg.innerHTML = `
    <h2 class="dlg-title"></h2>
    <p class="dlg-msg"></p>
    <input class="dlg-type" hidden autocomplete="off" spellcheck="false" aria-label="Type the confirmation phrase" />
    <div class="dlg-actions">
      <button type="button" class="btn ghost dlg-cancel">Cancel</button>
      <button type="button" class="btn dlg-ok">Confirm</button>
    </div>`;
  document.body.appendChild(dlg);
  return dlg;
}

export function confirmDialog(opts: ConfirmOpts): Promise<boolean> {
  const d = ensureDialog();
  el<HTMLHeadingElement>(".dlg-title", d)!.textContent = opts.title;
  el<HTMLParagraphElement>(".dlg-msg", d)!.textContent = opts.message;
  const okBtn = el<HTMLButtonElement>(".dlg-ok", d)!;
  const cancelBtn = el<HTMLButtonElement>(".dlg-cancel", d)!;
  const typeInput = el<HTMLInputElement>(".dlg-type", d)!;
  okBtn.textContent = opts.confirmText ?? "Confirm";
  okBtn.className = opts.danger ? "btn dlg-ok danger" : "btn dlg-ok";
  cancelBtn.textContent = opts.cancelText ?? "Cancel";

  if (opts.requireText) {
    typeInput.hidden = false;
    typeInput.value = "";
    okBtn.disabled = true;
  } else {
    typeInput.hidden = true;
    typeInput.value = "";
    okBtn.disabled = false;
  }

  return new Promise<boolean>((resolve) => {
    let done = false;
    const finish = (v: boolean): void => {
      if (done) return;
      done = true;
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onCancel);
      typeInput.removeEventListener("input", onType);
      d.close();
      resolve(v);
    };
    const onClose = (): void => finish(false);
    const onCancel = (): void => finish(false);
    const onType = (): void => {
      okBtn.disabled = typeInput.value !== opts.requireText;
    };

    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onCancel);
    typeInput.addEventListener("input", onType);
    okBtn.onclick = (): void => finish(true);
    cancelBtn.onclick = (): void => finish(false);

    // double-open guard: a still-open dialog would make showModal() throw
    // InvalidStateError (phase-3 review P3-10). Closing the stale one first
    // resolves its pending promise (false) via its own close listener.
    if (d.open) d.close();
    d.showModal();
    if (opts.requireText) typeInput.focus();
    else okBtn.focus();
  });
}
