import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appFile = (path) => readFile(new URL(`../app/${path}`, import.meta.url), "utf8");

test("a home recompõe o conteúdo para celular sem deck ou recortes", async () => {
  const css = await appFile("avancini-home.css");

  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*\.home-hero-layout\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*\.home-capabilities-layout\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(css, /@media\s*\(max-width:\s*720px\)[\s\S]*\.home-work-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.doesNotMatch(css, /position:\s*sticky/i);
});

test("os controles principais têm áreas de toque adequadas", async () => {
  const css = await appFile("avancini-home.css");

  assert.match(css, /\.home-menu-trigger\s*\{[^}]*min-height:\s*46px/i);
  assert.match(css, /\.home-primary-action\s*\{[^}]*min-height:\s*56px/i);
  assert.match(css, /\.home-footer-info nav a,[\s\S]*min-height:\s*44px/i);
});

test("não depende de física, autoplay ou listener global de scroll", async () => {
  const client = await appFile("avancini-os-client.tsx");

  assert.doesNotMatch(client, /InteractiveHeroField|setInterval|autoPlay|onPointerEnter/i);
  assert.doesNotMatch(client, /addEventListener\(["']scroll["']/i);
});

test("o menu pode rolar isoladamente e o movimento reduzido é respeitado", async () => {
  const css = await appFile("avancini-home.css");

  assert.match(css, /\.home-menu\s*\{[^}]*overflow-y:\s*auto/i);
  assert.match(css, /\.home-menu\s*\{[^}]*overscroll-behavior:\s*contain/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i);
});

test("o portfólio usa uma navegação direta e legível", async () => {
  const client = await appFile("avancini-os-client.tsx");
  const css = await appFile("avancini-home.css");

  assert.match(client, /className="home-work-grid"/);
  assert.match(client, /className=\{`home-work-card/);
  assert.doesNotMatch(client, /Deck|Grade|Visualização/i);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur/i);
});

test("o WhatsApp não simula mensagem não lida", async () => {
  const client = await appFile("avancini-os-client.tsx");

  assert.match(client, /\/whatsapp\.svg/);
  assert.doesNotMatch(client, /unread|badge|nova mensagem/i);
});

test("o rodapé permanece compacto em todas as larguras", async () => {
  const css = await appFile("avancini-home.css");

  assert.match(css, /\.home-footer\s*\{/i);
  assert.doesNotMatch(css, /\.home-footer[^}]*min-height:\s*(?:[6-9]\d{2}|\d{4,})px/i);
});
