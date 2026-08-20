import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Avancini OS institutional site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Avancini OS — Tecnologia com identidade/i);
  assert.match(html, /Sua empresa não precisa de mais tecnologia/i);
  assert.match(html, /Precisa da tecnologia certa/i);
  assert.match(html, /Duas especializações independentes/i);
  assert.match(html, /scroll-progress/i);
  assert.match(html, /AVANCINI WEB/i);
  assert.match(html, /AVANCINI SYNC/i);
  assert.match(html, /CHATBOTS &amp; AUTOMAÇÃO COM IA/i);
  assert.match(html, /Conhecer a especialização/i);
  assert.match(html, /Falar conosco/i);
  assert.doesNotMatch(html, /AVANCINI BRAIN|\bCRM\b|Radar WSB/i);
  assert.doesNotMatch(html, /↗/i);
  assert.match(html, /instagram\.com\/avancinios/i);
  assert.match(html, /avanciniweb\.vercel\.app/i);
  assert.doesNotMatch(html, /avancini-mark\.png/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("removes the disposable starter preview", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", templateRoot)));
  await assert.rejects(access(new URL("app/_sites-preview/preview.css", templateRoot)));
});
