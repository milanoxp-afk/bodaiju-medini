/**
 * Crisp chat helpers.
 *
 * openCrisp() opens the Crisp chatbox. If a message is passed, it is pre-loaded
 * into the composer (not auto-sent) so the visitor can review/edit before
 * sending — this carries context (e.g. a calculator estimate) into the chat
 * exactly like the old WhatsApp pre-fill did, but lands in YOUR Crisp inbox.
 *
 * Falls back gracefully: if Crisp hasn't loaded yet, it queues via window.$crisp
 * (Crisp's own array-based queue), so the action still works.
 */

type CrispCommand = unknown[];
interface WindowWithCrisp extends Window {
  $crisp?: CrispCommand[] & { push: (cmd: CrispCommand) => void };
}

export function openCrisp(message?: string): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithCrisp;
  // Ensure the queue exists even if the loader script hasn't run yet.
  w.$crisp = w.$crisp || ([] as unknown as WindowWithCrisp["$crisp"]);
  const crisp = w.$crisp!;
  try {
    if (message) {
      // Pre-fill the composer with context, then open the chat.
      crisp.push(["set", "message:text", [message]]);
    }
    crisp.push(["do", "chat:open"]);
    crisp.push(["do", "chat:show"]);
  } catch {
    /* never let a chat action break the UI */
  }
}
