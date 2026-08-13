import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("el web es publica en català i sense el contingut temporal", async () => {
  const [page, layout, agenda, history, musicians, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/agenda/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/historia/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/musics/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /lang="ca"/);
  assert.match(page, /La nostra música/);
  assert.match(agenda, /Mapa de Catalunya/);
  assert.match(history, /Una història/);
  assert.match(musicians, /Onze intèrprets/);
  assert.match(musicians, /Flabiol i tamborí/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});
