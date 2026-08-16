"use client";

import { useState } from "react";

export function CopyContactButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="copyContactButton" type="button" onClick={copyValue}>
      {copied ? "Copiat!" : label}
      <span aria-hidden="true">{copied ? "✓" : "＋"}</span>
    </button>
  );
}
