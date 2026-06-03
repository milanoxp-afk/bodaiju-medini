"use client";

import { openCrisp } from "../lib/crisp";
import { track } from "../lib/analytics";

/** Inline text link that opens the Crisp chat. For use in footers/prose. */
export function ChatLink({
  children,
  message,
  location = "chat_link",
  className = "",
}: {
  children: React.ReactNode;
  message?: string;
  location?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => { track("whatsapp_clicked", { location, channel: "crisp" }); openCrisp(message); }}
      className={`cursor-pointer text-left ${className}`}
    >
      {children}
    </button>
  );
}
